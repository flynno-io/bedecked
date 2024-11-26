import { DataTypes, Model, Sequelize, Optional } from "sequelize"

// TODO: create folder for types and interfaces and import them into the models
type mana = "W" | "U" | "B" | "R" | "G" | "C" // mana types - white, blue, black, red, green, colorless

interface CardAttributes {
	id: number
	scryFallId: string
	name: string
	cmc: number
	color: mana[]
	colorIdentity: mana[]
	power: number | null
	toughness: number | null
	oracleText: string | null
	imgUris: { small: string; normal: string }
}

interface CardCreationAttributes extends Optional<CardAttributes, "id"> {}

export class Card
	extends Model<CardAttributes, CardCreationAttributes>
	implements CardAttributes
{
	public id!: number
	public scryFallId!: string
	public name!: string
	public cmc!: number // cmc stands for Converted Mana Cost
	public color!: mana[] // All colors that the card is
	public colorIdentity!: mana[] // All colors that the card can represent
	public power!: number | null // Nullable for non-creatures
	public toughness!: number | null // Nullable for non-creatures
	public oracleText!: string | null // Nullable for some cards
	public imgUris!: { small: string; normal: string } // Path to the img formats "small" and "normal"
}

export function CardFactory(sequelize: Sequelize): typeof Card {
	Card.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			scryFallId: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			cmc: {
				type: DataTypes.DECIMAL(4, 2),
				allowNull: false,
				validate: {
					min: 0,
				},
			},
			color: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			colorIdentity: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: true,
			},
			power: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			toughness: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			oracleText: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			imgUris: {
				type: DataTypes.JSON,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Card",
			tableName: "cards",
			timestamps: true, // Adds createdAt and updatedAt fields
		}
	)
	return Card
}
