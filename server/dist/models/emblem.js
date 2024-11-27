import { DataTypes, Model } from "sequelize";
export class Emblem extends Model {
}
export function EmblemFactory(sequelize) {
    Emblem.init({
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
    }, {
        sequelize,
        modelName: "Emblem",
        tableName: "emblem",
        timestamps: false,
    });
    return Emblem;
}
