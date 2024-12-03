import { DataTypes, Sequelize, Optional, Model } from "sequelize"

interface EmblemAttributes {
	id: number
	name: string
  userId: number,
	imagePath: string
}

interface EmblemCreationAttributes extends Optional<EmblemAttributes, "id"> {}

export class Emblem
	extends Model<EmblemAttributes, EmblemCreationAttributes>
	implements EmblemAttributes
{
	public id!: number
	public name!: string
  public userId!: number
	public imagePath!: string
}

export function EmblemFactory(sequelize: Sequelize): typeof Emblem {
	Emblem.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			imagePath: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "users", // table name in the database
					key: "id",
				},
				onDelete: "CASCADE",
			},
		},
		{
			sequelize,
			modelName: "Emblem",
			tableName: "emblem",
			timestamps: false,
		}
	)
	return Emblem
}
