import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection';

type colors = "W" | "U" | "B" | "R" | "G" | "C" // white, blue, black, red, green, colorless
type format = "Standard" | "Commander" 

class Deck extends Model {
    public id!: number;
    public name!: string;
    public colors!: colors[]
    public format!: format
    public description!: string | null;
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