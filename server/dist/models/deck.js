import { DataTypes, Model } from "sequelize";
export class Deck extends Model {
}
export function DeckFactory(sequelize) {
    Deck.init({
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
                model: "users",
                key: "id",
            },
            onDelete: "CASCADE",
        },
    }, {
        sequelize,
        modelName: "Deck",
        tableName: "decks",
        timestamps: true,
    });
    return Deck;
}
