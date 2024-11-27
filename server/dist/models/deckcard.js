import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection.js';
class DeckCard extends Model {
}
DeckCard.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    deckId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'DeckCard',
    tableName: 'deck_cards',
    timestamps: false, // no timestamps needed for a join table
});
export default DeckCard;
