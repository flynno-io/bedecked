import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection.js';
class Card extends Model {
}
Card.init({
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
    manaCost: {
        type: DataTypes.STRING,
        allowNull: true,
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
    deckId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Deck',
            key: 'id',
        }
    }
}, {
    sequelize,
    modelName: 'Card',
    tableName: 'cards',
    timestamps: true, // Adds createdAt and updatedAt fields
});
export default Card;
