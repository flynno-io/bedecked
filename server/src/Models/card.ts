import { DataTypes, Model, Sequelize, Optional } from "sequelize"

// TODO: create folder for types and interfaces and import them into the models
type mana = "W" | "U" | "B" | "R" | "G" | "C" // mana types - white, blue, black, red, green, colorless

interface CardAttributes {
	id: number
	scryFallId: string
	name: string
	cmc: number
	colors: mana[]
	color_identity: mana[] // matches scryfall's color_identity
	power: string | null
	toughness: string | null
	oracle_text: string | null // matches scryfall's oracle_text
	image_uris: { small: string; normal: string; large: string; png: string; art_crop: string; border_crop: string; } // matches scryfall's image_uris
  object?: "card"
  oracle_id?: string
  multiverse_ids?: number[]
  mtgo_id?: number
  mtgo_foil_id?: number
  tcgplayer_id?: number
  cardmarket_id?: number
  lang?: string
  released_at?: string
  uri?: string
  scryfall_uri?: string
  layout?: string
  highres_image?: boolean
  image_status?: string
  mana_cost?: string
  type_line?: string
  keywords?: string[]
  legalities?: { standard: string; predh: string; paupercommander: string; alchemy: string; standardbrawl: string; explorer: string; oathbreaker: string; gladiator: string; timeless: string; future: string; historic: string; pioneer: string; modern: string; legacy: string; pauper: string; vintage: string; penny: string; commander: string; brawl: string; duel: string; oldschool: string; premodern: string; } // matches scryfall's legalities
  games?: string[]
  reserved?: boolean
  foil?: boolean
  nonfoil?: boolean
  finishes?: string[]
  oversized?: boolean
  promo?: boolean
  reprint?: boolean
  variation?: boolean
  set_id?: string
  cardSet?: string // populated with 'set' from scryfall - conflicts with 'set' from sequelize
  set_name?: string
  set_type?: string
  set_uri?: string
  set_search_uri?: string
  scryfall_set_uri?: string
  rulings_uri?: string
  prints_search_uri?: string
  collector_number?: string
  digital?: boolean
  rarity?: string
  card_back_id?: string
  artist?: string
  artist_ids?: string[]
  illustration_id?: string
  border_color?: string
  frame?: string
  full_art?: boolean
  textless?: boolean
  booster?: boolean
  story_spotlight?: boolean
  edhrec_rank?: number
  penny_rank?: number
  arena_id?: number
  frame_effects?: string[]
  flavor_text?: string
  flavor_name?: string
  security_stamp?: string
  produced_mana?: string[]
  promo_types?: string[]
  preview?: { source: string; source_uri: string; previewed_at: string; } // matches scryfall's preview
  all_parts?: { object: "related_card"; id: string; component: string; name: string; type_line: string; uri: string; }[] // matches scryfall's all_parts
  prices?: { usd: string | null; usd_foil: string | null; usd_etched: string | null;  eur: string | null; eur_foil: string | null; tix: string | null; } // matches scryfall's prices
  related_uris?: { gatherer?: string; tcgplayer_infinite_articles?: string; tcgplayer_infinite_decks?: string; tcgplayer_decks?: string; edhrec?: string; mtgtop8?: string; cardmarket?: string; cardhoarder?: string; card_kingdom?: string; mtgo_traders?: string; coolstuffinc?: string; scryfall?: string; tcgplayer?: string; } // matches scryfall's related_uris
  purchase_uris?: { tcgplayer?: string; cardmarket?: string; cardhoarder?: string; card_kingdom?: string; mtgo_traders?: string; coolstuffinc?: string; amazon?: string; ebay?: string; magiccardmarket?: string; cardhoarder_buylist?: string; tcgplayer_decks?: string; } // matches scryfall's purchase_uris
}

interface CardCreationAttributes extends Optional<CardAttributes, "id"> {}

export class Card
	extends Model<CardAttributes, CardCreationAttributes>
	implements CardAttributes
{
	public id!: number
	public scryFallId!: string
	public name!: string
	public cmc!: number // cmc stands for Converted Mana Cost
	public colors!: mana[] // All colors that the card is
	public color_identity!: mana[] // All colors that the card can represent
	public power!: string | null // Nullable for non-creatures
	public toughness!: string | null // Nullable for non-creatures
	public oracle_text!: string | null // Nullable for some cards
  public image_uris!: { small: string; normal: string; large: string; png: string; art_crop: string; border_crop: string; } // matches scryfall's image_uris
  public object?: "card"
  public oracle_id?: string
  public multiverse_ids?: number[]
  public mtgo_id?: number
  public mtgo_foil_id?: number
  public tcgplayer_id?: number
  public cardmarket_id?: number
  public lang?: string
  public released_at?: string
  public uri?: string
  public scryfall_uri?: string
  public layout?: string
  public highres_image?: boolean
  public image_status?: string
  public mana_cost?: string
  public type_line?: string
  public keywords?: string[]
  public legalities?: { standard: string; predh: string; paupercommander: string; alchemy: string; standardbrawl: string; explorer: string; oathbreaker: string; gladiator: string; timeless: string; future: string; historic: string; pioneer: string; modern: string; legacy: string; pauper: string; vintage: string; penny: string; commander: string; brawl: string; duel: string; oldschool: string; premodern: string; } // matches scryfall's legalities
  public games?: string[]
  public reserved?: boolean
  public foil?: boolean
  public nonfoil?: boolean
  public finishes?: string[]
  public oversized?: boolean
  public promo?: boolean
  public reprint?: boolean
  public variation?: boolean
  public cardSet?: string // populated with 'set' from scryfall - conflicts with 'set' from sequelize
  public set_id?: string
  public set_name?: string
  public set_type?: string
  public set_uri?: string
  public set_search_uri?: string
  public scryfall_set_uri?: string
  public rulings_uri?: string
  public prints_search_uri?: string
  public collector_number?: string
  public digital?: boolean
  public rarity?: string
  public card_back_id?: string
  public artist?: string
  public artist_ids?: string[]
  public illustration_id?: string
  public border_color?: string
  public frame?: string
  public full_art?: boolean
  public textless?: boolean
  public booster?: boolean
  public story_spotlight?: boolean
  public edhrec_rank?: number
  public penny_rank?: number
  public arena_id?: number
  public frame_effects?: string[]
  public flavor_text?: string
  public flavor_name?: string
  public security_stamp?: string
  public produced_mana?: string[]
  public promo_types?: string[]
  public preview?: { source: string; source_uri: string; previewed_at: string; } // matches scryfall's preview
  public all_parts?: { object: "related_card"; id: string; component: string; name: string; type_line: string; uri: string; }[];
  public prices?: { usd: string | null; usd_foil: string | null; usd_etched: string | null;  eur: string | null; eur_foil: string | null; tix: string | null; } // matches scryfall's prices
  public related_uris?: { gatherer?: string; tcgplayer_infinite_articles?: string; tcgplayer_decks?: string; edhrec?: string; mtgtop8?: string; cardmarket?: string; cardhoarder?: string; card_kingdom?: string; mtgo_traders?: string; coolstuffinc?: string; scryfall?: string; tcgplayer?: string; } // matches scryfall's related_uris
  public purchase_uris?: { tcgplayer?: string; cardmarket?: string; cardhoarder?: string; card_kingdom?: string; mtgo_traders?: string; coolstuffinc?: string; amazon?: string; ebay?: string; magiccardmarket?: string; cardhoarder_buylist?: string; tcgplayer_decks?: string; } // matches scryfall's purchase_uris
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
