import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection';

class Deck extends Model {
    public id!: number;
    public name!: string;
    public dscription!: string | null;
    public userId!: number; // Foreign key to User
}

Deck.init (
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
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User', 
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize,
        modelName: 'Deck',
        tableName: 'decks',
        timestamps: true,
    }
);

export default Deck;