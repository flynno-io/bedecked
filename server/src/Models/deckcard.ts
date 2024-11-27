import { DataTypes, Sequelize, Optional, Model } from "sequelize"

interface DeckCardAttributes {
	id: number
	deckId: number
	cardId: number
}

interface DeckCardCreationAttributes
	extends Optional<DeckCardAttributes, "id"> {}

export class DeckCard
	extends Model<DeckCardAttributes, DeckCardCreationAttributes>
	implements DeckCardAttributes
{
	public id!: number
	public deckId!: number
	public cardId!: number
}

export function DeckCardFactory(sequelize: Sequelize): typeof DeckCard {
	DeckCard.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			deckId: {
				type: DataTypes.INTEGER,
				allowNull: false,
        references: {
					model: "decks",
					key: "id",
				},
			},
			cardId: {
				type: DataTypes.INTEGER,
				allowNull: false,
        references: {
					model: "cards",
					key: "id",
				},
			},
		},
		{
			sequelize,
			modelName: "DeckCard",
			tableName: "deck_cards",
			timestamps: false, // no timestamps needed for a join table
		}
	)
	return DeckCard
}
