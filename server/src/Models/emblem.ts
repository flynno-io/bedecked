import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection.js';

class Emblem extends Model {
    public id!: number;
    public name!: string;
    public imagePath!: string;
}

Emblem.init(
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
        imagePath: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', //table name in the database
                key: 'id',
            },
            onDelete: 'CASCADE',
        }
    },
    {
        sequelize,
        modelName: 'Emblem',
        tableName: 'emblem',
        timestamps: false,
    }
);

export default Emblem;