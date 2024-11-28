import { DataTypes, Model } from "sequelize";
import bcrypt from "bcryptjs";
export class User extends Model {
    async setPassword(newPassword) {
        this.password = await bcrypt.hash(newPassword, 10);
    }
    checkPassword(loginPw) {
        return bcrypt.compare(loginPw, this.password);
    }
}
export function UserFactory(sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, // ensures valid email
            },
        },
        manaTheme: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "white",
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter a password',
                },
                len: {
                    args: [8, 20],
                    msg: 'Your password must be between 8 and 20 characters',
                },
            },
        },
    }, {
        hooks: {
            beforeCreate: async (newUserData) => {
                await newUserData.setPassword(newUserData.password);
            },
            beforeUpdate: async (updatedUserData) => {
                if (updatedUserData.password) {
                    await updatedUserData.setPassword(updatedUserData.password);
                }
            }
        },
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true, // Adds createdAt and updatedAt fields
    });
    return User;
}
