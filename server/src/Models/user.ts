import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection.js';
import bcrypt from 'bcryptjs';

class User extends Model {
    public id!:number;
    public username!: string;
    public email!: string;
    public manaTheme!: string;
    public password!: string;
}

User.init(
    {
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
            }
        },
        manaTheme: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'white',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true, //Ads createdAt and updatedAt fields
    }
);

User.beforeCreate(async (user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

User.beforeUpdate(async (user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

export default User;