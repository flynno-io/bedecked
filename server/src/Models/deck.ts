import { DataTypes, Sequelize, Optional, Model } from "sequelize"

// Define deck colors and formats
type colors = "W" | "U" | "B" | "R" | "G" | "C" // white, blue, black, red, green, colorless
type format = "Standard" | "Commander"

interface DeckAttributes {
	id: number
	name: string
	format: format
	colors: colors[]
	description: string | null
	userId: number // Foreign key to User
}

interface DeckCreationAttributes extends Optional<DeckAttributes, "id"> {}

export class Deck
	extends Model<DeckAttributes, DeckCreationAttributes>
	implements DeckAttributes
{
	public id!: number
	public name!: string
	public format!: format
	public colors!: colors[]
	public description!: string | null
	public userId!: number // Foreign key to User
}

export function DeckFactory(sequelize: Sequelize): typeof Deck {
	Deck.init(
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
			format: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			colors: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "User",
					key: "id",
				},
				onDelete: "CASCADE",
			},
		},
		{
			sequelize,
			modelName: "Deck",
			tableName: "decks",
			timestamps: true,
		}
	)
	return Deck
}
