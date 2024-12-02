import { Deck, DeckCard } from "../models/index.js"
import { DeckCreationAttributes } from "../models/deck.js"
import { Card } from "../models/index.js"
import { Op } from "sequelize"
import { DeckCardCreationAttributes } from "../models/deckcard.js"

// Define the decks to seed
const decks: DeckCreationAttributes[] = [
	{
		name: "User 1 - Deck 1",
		format: "Standard",
		colors: ["W"],
		description: "Test deck one - only white cards",
		userId: 1,
	},
  {
		name: "User 1 - Deck 2",
		format: "Standard",
		colors: ["U"],
		description: "Test deck two - only white cards",
		userId: 1,
	},
  {
		name: "User 2 - Deck 1",
		format: "Standard",
		colors: ["G"],
		description: "Test deck two - only white cards",
		userId: 2,
	},
  {
		name: "User 2 - Deck 2",
		format: "Standard",
		colors: ["B"],
		description: "Test deck two - only white cards",
		userId: 2,
	},
  {
		name: "User 2 - Deck 3",
		format: "Standard",
		colors: ["R"],
		description: "Test deck two - only white cards",
		userId: 2,
	},
	// {
	// 	name: "Commander Deck",
	// 	format: "Commander",
	// 	colors: ["U", "G"],
	// 	description: "A commander deck with blue and green cards",
	// 	userId: 2,
	// },
]

// Add the decks to the database
export const seedDecks = async (): Promise<void> => {
	for (let i = 0; i < decks.length; i++) {
		// create a new deck
		const _newDeck = await Deck.create(decks[i])
    const newDeck = _newDeck.toJSON()

		// Get and add cards to the deck
		if (newDeck.format === "Standard") {

			// Get the first 48 white cards to add to the deck
			const { rows } = await Card.findAndCountAll({
				where: {
					colors: { [Op.contains]: ["W"] },
				},
				offset: 0,
				limit: 48,
			})

      // convert the array of cards objects into json objects
      const cards = rows.map(card => card.toJSON())

      let manaType
      if (newDeck.colors.includes("W")) {
        manaType = "Plains"
      } else if (newDeck.colors.includes("U")) {
        manaType = "Island"
      } else if (newDeck.colors.includes("G")) {
        manaType = "Forest"
      } else if (newDeck.colors.includes("R")) {
        manaType = "Mountain"
      } else if (newDeck.colors.includes("B")) {
        manaType = "Swamp"
      } else (
        manaType = "Plains" // if no color specified, default to white
      )

			// Get and add the necessary basic lands (plains) to the deck
			const plainsCard = await Card.findAndCountAll({
				where: { name: { [Op.iLike]: manaType }},
			})

      // Add the cards to the deckCard in the deckCard row format
			const deckCards: DeckCardCreationAttributes[] = cards.map((card) => ({
				cardId: card.id,
				deckId: newDeck.id,
				count: 1,
			}))

      // Add the basic lands to the deckCard in the deck
			deckCards.push({
				cardId: plainsCard.rows[1].id,
				deckId: newDeck.id,
				count: 24,
			})

			// Add the cards to the deckCard table
			await DeckCard.bulkCreate(deckCards)
		} else {
			// Commander deck

			// Get the first 56 blue and green cards to add to the deck
			const { rows } = await Card.findAndCountAll({
				where: {
					colors: {
						[Op.or]: [{ [Op.contains]: ["U"] }, { [Op.contains]: ["G"] }],
					},
				},
				offset: 0,
				limit: 56,
			})

      // convert the array of cards objects into json objects
      const cards = rows.map(card => card.toJSON())

			// Get and add the necessary basic lands (forest & island) to the deck
			const islandCard = await Card.findAndCountAll({
				where: { name: { [Op.iLike]: "Island" }},
			})
			const forestCard = await Card.findAndCountAll({
				where: { name: { [Op.iLike]: "Forest" }},
			})
			const deckCards: DeckCardCreationAttributes[] = cards.map((card) => ({
				cardId: card.id,
				deckId: newDeck.id,
				count: 1,
			}))
			deckCards.push({
				cardId: islandCard.rows[1].id,
				deckId: newDeck.id,
				count: 22,
			})
			deckCards.push({
				cardId: forestCard.rows[1].id,
				deckId: newDeck.id,
				count: 22,
			})

			// Add the cards to the deckCard table
			await DeckCard.bulkCreate(
				deckCards.map(
					(card) =>
						({
							cardId: card.id,
							deckId: newDeck.id,
							count: 1,
						} as DeckCardCreationAttributes)
				)
			)
		}
	}
}
