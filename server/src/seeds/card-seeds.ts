import omit from "lodash/omit.js"
import { Card } from "../models/index.js"
import { CardCreationAttributes } from "../models/card.js"
import testCardData from "../../db/card.test.json" assert { type: "json" }

// This is the list of keys to remove from the testCardData
const keysToRemove = [
  "id",
  "object",
  "oracle_id",
  "multiverse_ids",
  "mtgo_id",
  "mtgo_foil_id",
  "tcgplayer_id",
  "cardmarket_id",
  "lang",
  "released_at",
  "uri",
  "layout",
  "highres_image",
  "image_status",
  "keywords",
  "all_parts",
  "legalities",
  "games",
  "reserved",
  "foil",
  "nonfoil",
  "finishes",
  "oversized",
  "promo",
  "reprint",
  "variation",
  "set",
  "set_id",
  "set_name",
  "set_type",
  "set_uri",
  "set_search_uri",
  "scryfall_set_uri",
  "rulings_uri",
  "prints_search_uri",
  "collector_number",
  "digital",
  "card_back_id",
  "artist",
  "artist_ids",
  "illustration_id",
  "border_color",
  "frame",
  "frame_effects",
  "full_art",
  "textless",
  "booster",
  "story_spotlight",
  "edhrec_rank",
  "preview",
  "prices",
  "related_uris",
  "purchase_uris",
  "security_stamp",
  "watermark",
  "produced_mana",
  "card_faces",
]

export const seedCards = async (): Promise<void> => {
  const cardData = testCardData.map((card) => omit({
    ...card,
    scryFallId: card.id,
    colors: card.colors,
    color_identity: card.color_identity,
    image_uris: card.image_uris,
  }, keysToRemove)) as unknown as CardCreationAttributes[] // Required to remove the keys from the testCardData object and prevent type errors
  try {
    await Card.bulkCreate(cardData, { individualHooks: false })
  } catch (error: any) {
    console.error("Error seeding users:", error)
  }
}
