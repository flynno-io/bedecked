import { DataTypes, Model } from "sequelize";
export class Card extends Model {
}
export function CardFactory(sequelize) {
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
        cmc: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        colors: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        color_identity: {
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
        oracle_text: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        image_uris: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Card",
        tableName: "cards",
        timestamps: true, // Adds createdAt and updatedAt fields
    });
    return Card;
}
