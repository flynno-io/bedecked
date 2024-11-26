import { DataTypes, Sequelize, Optional, Model } from "sequelize"
import bcrypt from "bcryptjs"

interface UserAttributes {
	id: number
	username: string
	email: string
	manaTheme: string
	password: string
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
	extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes
{
	public id!: number
	public username!: string
	public email!: string
	public manaTheme!: string
	public password!: string

  async setPassword(newPassword: string): Promise<void> {
    this.password = await bcrypt.hash(newPassword, 10)
  }

  checkPassword(loginPw: string): Promise<boolean> {
    return bcrypt.compare(loginPw, this.password);
  }
}

export function UserFactory(sequelize: Sequelize): typeof User {
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
		},
		{
      hooks: {
        beforeCreate: async (newUserData) => {
          await newUserData.setPassword(newUserData.password)
        },
        beforeUpdate: async (updatedUserData) => {
          if (updatedUserData.password) {
            await updatedUserData.setPassword(updatedUserData.password)
          }
        }
      },
			sequelize,
			modelName: "User",
			tableName: "users",
			timestamps: true, // Adds createdAt and updatedAt fields
		}
	)
	return User
}

export default User
