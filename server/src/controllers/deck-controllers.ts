import { Request, Response } from "express"
import { Card, Deck, DeckCard } from "../model/index.js"
import { WhereOptions, Op } from "sequelize"
import { DeckCardCreationAttributes } from "../model/deckcard.js"
import { DeckCreationAttributes } from "../model/deck.js"
import { getCreaturesCards, getSpellCards, getLandCards } from "../utils/generateDeck.js"

// Define deck colors
type colors = "W" | "U" | "B" | "R" | "G" | "C" // white, blue, black, red, green, colorless
type format = "Standard" | "Commander"

// Define filters interface
interface filters {
	name?: string
	format?: format[]
	colors?: colors[]
	page?: number
	limit?: number
}

// De
export interface DeckSettings {
  info: {
    name: string
    format: "Standard" | "Commander" // or any other valid formats
    colors: ("W" | "U" | "B" | "R" | "G")[]
    description: string
  }
  settings: {
    creatureTypes: string[]
    creatureCount: number
    landCount: number
    spellsCount: number
  }
  creatureCards?: DeckCardCreationAttributes[]
  spellCards?: DeckCardCreationAttributes[]
  landCards?: DeckCardCreationAttributes[]
  deckId?: number
}


interface card {
	cardId: string
	count: number
}

// Get all decks using query parameters and pagination => GET /
export const getAllDecks = async (
	req: Request,
	res: Response
): Promise<void> => {
	const {
		name,
		format,
		colors,
		page = 1, // default is page 1
		limit = 100, // default is 100 decks per page
	} = req.query as filters

	// Define filters object
	const filters: WhereOptions = {}

	// Add filters to filters object
	if (name) filters.name = { [Op.iLike]: `%${name}%` } // case-insensitive search
	if (format) filters.format = { [Op.or]: format } // case-insensitive search
	if (colors) filters.colors = { [Op.or]: colors } // case-insensitive search

	// Define pagination variable
	const offset = (page - 1) * limit

	// Find and count all decks
	try {
		const { count, rows } = await Deck.findAndCountAll({
			where: filters,
			offset,
			limit: limit,
		})
		res.status(200).json({
			total_decks: count, // total number of decks
			decks: rows, // array of decks
			has_more: count > offset + rows.length, // boolean - true if there are more decks
			// link to next page
			next_page:
				count > offset + rows.length
					? `${req.protocol}://${req.get("host")}${req.baseUrl}?page=${page + 1}&limit=${limit}`
					: null,
		})
	} catch (error: any) {
		res.status(400).json({ error: error.message })
	}
}

// Get all decks by user ID using query parameters and pagination => GET /deck/my-decks
export const getAllDecksById = async (
	req: Request,
	res: Response
): Promise<void> => {
	const {
		name,
		format,
		colors,
		page = 1, // default is page 1
		limit = 100, // default is 100 decks per page
	} = req.query as filters
	const userId = req.user?.id

	// Define filters object
	const filters: WhereOptions = {}

	// Add filters to filters object
	if (name) filters.name = { [Op.iLike]: `%${name}%` } // case-insensitive search
	if (format) filters.format = { [Op.or]: format } // case-insensitive search
	if (colors) filters.colors = { [Op.or]: colors } // case-insensitive search
	if (userId) filters.userId = userId

	// Define pagination variable
	const offset = (page - 1) * limit

	// Find and count all decks
	try {
		const { count, rows } = await Deck.findAndCountAll({
			where: filters,
			offset,
			limit: limit,
		})
		res.status(200).json({
			total_decks: count, // total number of decks
			decks: rows, // array of decks
			has_more: count > offset + rows.length, // boolean - true if there are more decks
			// link to next page
			next_page:
				count > offset + rows.length
					? `${req.protocol}://${req.get("host")}${req.baseUrl}?page=${
							page + 1
					  }&limit=${limit}`
					: null,
		})
	} catch (error: any) {
		res.status(400).json({ error: error.message })
	}
}

// Get deck by ID => GET /deck/:id
export const getDeckById = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params
	try {
		const deck = await Deck.findByPk(id, {
			include: [
				{
					model: DeckCard,
					as: "cards",
					include: [
						{
							model: Card,
							attributes: [
								"name",
								"power",
								"toughness",
								"oracle_text",
								"cmc",
								"colors",
								"type_line",
								"image_uris",
							],
						},
					],
				},
			],
		})
		if (deck) {
			res.json(deck)
		} else {
			res.status(404).json({ error: "Deck not found" })
		}
	} catch (error: any) {
		res.status(400).json({ error: error.message })
	}
}

// Create a new deck => POST /deck
export const createDeck = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { name, format, colors, cards } = req.body
	const userId = req.user?.id

	if (!userId) {
		res.status(401).json({ error: "Unauthorized" })
		return
	}

	try {
		// Create a new deck
		const _deck = await Deck.create({ name, format, colors, userId })
		const deck = _deck.toJSON()

		// Create deck cards to add to the deckCard table
		const formattedCards: DeckCardCreationAttributes[] = cards.map(
			(card: card) => {
				return {
					cardId: card.cardId,
					deckId: deck.id,
					count: card.count,
				}
			}
		)

		// Add the cards to the deckCard table
		const deckCards = await DeckCard.bulkCreate(formattedCards)
		if (!deckCards) {
			res.status(400).json({ error: "Error creating deck" })
		}

		// Get the new deck with cards
		const newDeckWithCards = await Deck.findByPk(deck.id, {
			include: [
				{
					model: DeckCard,
					as: "cards",
					include: [
						{
							model: Card,
							attributes: [
								"name",
								"power",
								"toughness",
								"oracle_text",
								"cmc",
								"colors",
								"type_line",
								"image_uris",
							],
						},
					],
				},
			],
		})

		// return the new deck with cards
		res.status(201).json(newDeckWithCards)
	} catch (error: any) {
		res.status(400).json({ error: error.message })
	}
}

// Create a new Deck => POST /generate-deck
export const generateDeck = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id
  const deck: DeckSettings = req.body.deck

  // Check if the user exists
  if (!userId) {
    res.status(404).send({ message: "User not found" })
    return
  } else if (!deck) {
    res.status(404).send({ message: "Deck data not provided" })
    return
  } else {
    deck.deckId = userId
  }

  // Check if all required deck settings are provided
  const requiredSettings = ["info.name", "info.format", "info.colors", "info.description", "settings.creatureTypes", "settings.creatureCount", "settings.landCount", "settings.spellsCount"];
  for (const setting of requiredSettings) {
    const keys = setting.split(".");
    let value = deck as any;
    for (const key of keys) {
      value = value[key];
      if (value === undefined) {
        res.status(404).send({ message: `Missing ${setting}` });
        return;
      }
    }
  }

  console.log("Generating deck...")

  try {
    // create a new deck
    const _newDeck = await Deck.create({ ...deck.info, userId })
    const newDeck = _newDeck.toJSON() as DeckCreationAttributes & { id: number }
    deck.deckId = newDeck.id

    console.log(`Deck ${newDeck.id} created`)

    // Get and add cards to the deck for Standard format
    if (newDeck.format === "Standard") {

      const deckCards: DeckCardCreationAttributes[] = []
      
      // Get and add the creature cards to the deck
      deck.creatureCards = await getCreaturesCards(deck)
      deckCards.push(...deck.creatureCards)

      // Get and add the spell cards to the deck
      deck.spellCards = await getSpellCards(deck)
      deckCards.push(...deck.spellCards)

      // Get and add the necessary basic land cards to the deck
      deck.landCards = await getLandCards(deck)
      deckCards.push(...deck.landCards)

      // Add the cards to the deckCard table
      await DeckCard.bulkCreate(deckCards)

      // return the new deck with cards
      try {
        const finalDeck = await Deck.findByPk(deck.deckId, {
          include: [
            {
              model: DeckCard,
              as: "cards",
              include: [
                {
                  model: Card,
                  attributes: [
                    "name",
                    "power",
                    "toughness",
                    "oracle_text",
                    "cmc",
                    "colors",
                    "type_line",
                    "image_uris",
                  ],
                },
              ],
            },
          ],
        })

        // return the new deck with cards
        if (finalDeck) {
          res.json(finalDeck)
          return
        } else {
          res.status(404).json({ error: "Error returning newly created deck" })
        }
      } catch (error: any) {
        res.status(400).json({ error: error.message })
      }
    } else {
      console.log("Commander deck")
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// Update deck by ID => PUT /deck/:id
export const updateDeck = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params
	const { name, format, colors, description } = req.body
	try {
		const deck = await Deck.findByPk(id)
		if (deck) {
			if (name) deck.name = name
			if (format) deck.format = format
			if (colors) deck.colors = colors
			if (description) deck.description = description
			await deck.save()
			res.json(deck)
		} else {
			res.status(404).json({ error: "Deck not found" })
		}
	} catch (error: any) {
		res.status(400).json({ error: error.message })
	}
}

// Delete deck by ID => DELETE /deck/:id
export const deleteDeck = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { id } = req.params
	try {
		const deck = await Deck.findByPk(id)
		if (deck) {
			await deck.destroy()
			res.status(204).end()
		} else {
			res.status(404).json({ error: "Deck not found" })
		}
	} catch (error: any) {
		res.status(400).json({ error: error.message })
	}
}
