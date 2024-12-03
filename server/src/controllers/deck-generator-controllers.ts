import { Request, Response } from "express"
import { Deck, DeckCard } from "../model/index.js"
import { DeckCardCreationAttributes } from "../model/deckcard.js"
import { DeckCreationAttributes } from "../model/deck.js"
import { getCreaturesCards, getLandCards, getSpellCards } from "../utils/generateDeck.js"

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

  // create a new deck
  const _newDeck = await Deck.create({ ...deck.info, userId })
  const newDeck = _newDeck.toJSON() as DeckCreationAttributes & { id: number }

  // Get and add cards to the deck
  if (newDeck.format === "Standard") {
    
    // Get and add the creature cards to the deck
    deck.creatureCards = await getCreaturesCards(deck)

    // Get and add the spell cards to the deck
    deck.spellCards = await getSpellCards(deck)

    // Get and add the necessary basic land cards to the deck
    deck.landCards = await getLandCards(deck)

    // Add the cards to the deckCard in the deckCard row format
    const deckCards: DeckCardCreationAttributes[] = [...deck.creatureCards, ...deck.spellCards, ...deck.landCards];

    // Add the cards to the deckCard table
    await DeckCard.bulkCreate(deckCards)
  } else {
    console.log("Commander deck")
  }
}