import { Card } from "../model/index.js"
import { Op } from "sequelize"
import { DeckSettings } from "../controllers/deck-controllers.js"
import { CardCreationAttributes } from "../model/card.js"
import { DeckCardCreationAttributes } from "../model/deckcard.js"

// Convert the cards to the deckCard row format
export const convertToDeckCardFormat = (
	deckId: number,
	count: number | null,
	cards: CardCreationAttributes[]
): DeckCardCreationAttributes[] => {
	try {
		// Map the cards to the deckCard row format
		const deckCards: DeckCardCreationAttributes[] = cards.map((card) => ({
			cardId: card.id!,
			deckId: deckId,
			count: count ? count : 1,
		}))

		// Return an array of deckCard objects
		return deckCards
	} catch (error) {
		console.error("Error converting cards to deckCard format:", error)
		throw error
	}
}

// Get creature cards
export const getCreaturesCards = async (
	deck: DeckSettings
): Promise<DeckCardCreationAttributes[]> => {
	try {
		// Random offset for the creatures
		const CreatureRandomOffset: number = Math.floor(Math.random() * 10000)

		// CREATURE TYPES: Get {count} number of creatures of the specified types
		const { rows } = await Card.findAndCountAll({
			where: {
				colors: { [Op.overlap]: deck.info.colors },
				[Op.or]: deck.settings.creatureTypes.map((type) => ({
					type_line: {
						[Op.iLike]: `%${type}%`, // Case-insensitive match
					},
				})),
			},
			offset: CreatureRandomOffset,
			limit: deck.settings.creatureCount,
		})

		// convert the array of cards objects into json objects
		const createCardsJSON = rows.map((card) => card.toJSON())

		// convert the cards to the deckCard row format
		const createCards = convertToDeckCardFormat(
			deck.deckId!,
			null,
			createCardsJSON
		)

		return createCards
	} catch (error) {
		console.error("Error fetching creature cards:", error)
		throw error
	}
}

// Get spell cards
export const getSpellCards = async (
	deck: DeckSettings
): Promise<DeckCardCreationAttributes[]> => {
	try {
		const SpellRandomOffset = Math.floor(Math.random() * 10000)
		const spellTypes = [
			"Instant",
			"Sorcery",
			"Enchantment",
			"Artifact",
			"Planeswalker",
		]

		// SPELL CARDS: Get {count} number of spells
		const { rows } = await Card.findAndCountAll({
			where: {
				colors: { [Op.overlap]: deck.info.colors },
				type_line: { [Op.or]: spellTypes },
			},
			offset: SpellRandomOffset,
			limit: deck.settings.spellsCount,
		})

		// convert the array of cards objects into json objects
		const spellCardsJSON = rows.map((card) => card.toJSON())

		const spellCards = convertToDeckCardFormat(
			deck.deckId!,
			null,
			spellCardsJSON
		)

		return spellCards
	} catch (error) {
		console.error("Error fetching spell cards:", error)
		throw error
	}
}

// Get land cards
export const getLandCards = async (
	deck: DeckSettings
): Promise<DeckCardCreationAttributes[]> => {
	try {
		const manaType: string[] = []
		if (deck.info.colors.includes("W")) {
			manaType.push("Plains")
		}
		if (deck.info.colors.includes("U")) {
			manaType.push("Island")
		}
		if (deck.info.colors.includes("G")) {
			manaType.push("Forest")
		}
		if (deck.info.colors.includes("R")) {
			manaType.push("Mountain")
		}
		if (deck.info.colors.includes("B")) {
			manaType.push("Swamp")
		}

		console.log("Passed in deck to land:", deck)

		const cardPerLand = Math.floor(deck.settings.landCount / manaType.length)

		const landCardsArray: DeckCardCreationAttributes[] = []

		// LAND CARDS: Get {count} number of lands
		for (let i = 0; i < manaType.length; i++) {
			const { rows } = await Card.findAndCountAll({
				where: {
					name: { [Op.like]: manaType[i] },
				},
				offset: 0,
				limit: cardPerLand,
			})

			// convert the array of cards objects into json objects
			const landCardJSON = rows.map((card) => card.toJSON())
			const landCard = new Array(landCardJSON[0])

			// convert the cards to the deckCard row format
			const landCards: DeckCardCreationAttributes[] = convertToDeckCardFormat(
				deck.deckId!,
				cardPerLand,
				landCard
			)
			landCardsArray.push(...landCards)
		}

		console.log("Land Cards Array:", landCardsArray)

		// Check if the total land cards count is equal to the land count
		const totalLandCards = landCardsArray.reduce((acc, card) => acc + card.count, 0)
		console.log("Total Land Cards", totalLandCards)
		console.log(
			"Is equal to land count",
			deck.settings.landCount === totalLandCards
		)

		return landCardsArray
	} catch (error) {
		console.error("Error fetching land cards:", error)
		throw error
	}
}
