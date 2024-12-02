import { DataTypes, Sequelize, Optional, Model } from "sequelize"

interface DeckCardAttributes {
	id: number
	deckId: number
	cardId: number
  count: number
}

export interface DeckCardCreationAttributes
	extends Optional<DeckCardAttributes, "id"> {}

export class DeckCard
	extends Model<DeckCardAttributes, DeckCardCreationAttributes>
	implements DeckCardAttributes
{
	public id!: number
	public deckId!: number
	public cardId!: number
  public count!: number
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
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
			},
			cardId: {
				type: DataTypes.INTEGER,
				allowNull: false,
        references: {
					model: "cards",
					key: "id",
				},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
			},
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      }
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
