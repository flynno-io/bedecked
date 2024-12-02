import { Router } from "express"
import { getAllDecks, getDeckByUserId, createDeck, updateDeck, deleteDeck } from "../../controllers/deck-controllers.js"

const router = Router()

// GET / - Get all decks using query parameters and pagination
router.get("/", getAllDecks)

// GET /:id - Get deck by ID
router.get("/:id", getDeckByUserId)

// POST / - Create a new deck
router.post("/", createDeck)

// PUT /:id - Update deck by ID
router.put("/:id", updateDeck)

// DELETE /:id - Delete deck by ID
router.delete("/:id", deleteDeck)

export { router as deckRouter }
