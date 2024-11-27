import { DataTypes, Model } from "sequelize";
export class DeckCard extends Model {
}
export function DeckCardFactory(sequelize) {
    DeckCard.init({
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
    }, {
        sequelize,
        modelName: "DeckCard",
        tableName: "deck_cards",
        timestamps: false, // no timestamps needed for a join table
    });
    return DeckCard;
}
