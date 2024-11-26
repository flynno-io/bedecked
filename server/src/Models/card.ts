import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection';

class Card extends Model {
    public id!: number;
    public scryFallId!: string;
    public name!: string;
    public manaCost!: string | null ; //Nullable for lands
    public cmc!: string; //cmc stands for Converted Mana Cost
    public color!: string;
    public colorIdentity!: string[]; //All colors that the card can represent
    public power!: number | null; //Nullable for non-creatures
    public toughness!: number | null; //Nullable for non-creatures
    public oracleText!: string | null; //Nullable for some cards
    public imgUris!: { small: string; normal: string }; //Path to the img formats "small" and "normal"
}

Card.init(
    {
        id:{
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
        deckId: {//allows for cards to be a part of a deck and nullable so that they can remain individual cards if need be.
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Deck',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        modelName: 'Card',
        tableName: 'cards',
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

export default Card;