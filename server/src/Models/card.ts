import { DataTypes, Model, Sequelize, Optional } from "sequelize"

// TODO: create folder for types and interfaces and import them into the models
type mana = "W" | "U" | "B" | "R" | "G" | "C" // mana types - white, blue, black, red, green, colorless

interface CardAttributes {
	id: number
	scryFallId: string
	name: string
	cmc: number
	colors: mana[] | []
	color_identity: mana[] // matches scryfall's color_identity
	power: string | null
	toughness: string | null
	oracle_text: string | null // matches scryfall's oracle_text
	image_uris: { small: string; normal: string; large: string; png: string; art_crop: string; border_crop: string; } | undefined | null // matches scryfall's image_uris
  rarity: string,
  flavor_text: string,
  mana_cost: string
  type_line: string | null
  scryfall_uri: string
}

export interface CardCreationAttributes extends Optional<CardAttributes, "id"> {}

export class Card
	extends Model<CardAttributes, CardCreationAttributes>
	implements CardAttributes
{
	public id!: number
	public scryFallId!: string
	public name!: string
	public cmc!: number // cmc stands for Converted Mana Cost
	public colors!: mana[] | [] // All colors that the card is
	public color_identity!: mana[] // All colors that the card can represent
	public power!: string | null // Nullable for non-creatures
	public toughness!: string | null // Nullable for non-creatures
	public oracle_text!: string | null // Nullable for some cards
  public image_uris!: { small: string; normal: string; large: string; png: string; art_crop: string; border_crop: string; } | undefined | null // matches scryfall's image_uris
  public rarity!: string
  public flavor_text!: string
  public mana_cost!: string
  public type_line!: string | null
  public scryfall_uri!: string
}

export function CardFactory(sequelize: Sequelize): typeof Card {
	Card.init(
		{
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
				type: DataTypes.DECIMAL(1000, 2),
				allowNull: false,
				validate: {
					min: 0,
				},
			},
			colors: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: false,
        defaultValue: [],
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
      rarity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flavor_text: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      mana_cost: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type_line: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      scryfall_uri: {
        type: DataTypes.STRING,
        allowNull: false,
      },
		},
		{
			sequelize,
			modelName: "Card",
			tableName: "cards",
			timestamps: true, // Adds createdAt and updatedAt fields
		}
	)
	return Card
}
