import { Router } from "express"
import { getAllDecks, getAllDecksById, getDeckById, createDeck, updateDeck, deleteDeck } from "../../controllers/deck-controllers.js"

const router = Router()

// *** Root route is /api/decks ***

// GET / - Get all decks using query parameters and pagination
router.get("/", getAllDecks)

// GET /user/:id - Get all decks by user ID
router.get("/my-decks/", getAllDecksById)

// GET /:id - Get deck by ID
router.get("/:id", getDeckById)

// POST / - Create a new deck
router.post("/", createDeck)

// PUT /:id - Update deck by ID
router.put("/:id", updateDeck)

// DELETE /:id - Delete deck by ID
router.delete("/:id", deleteDeck)

export { router as deckRouter }
