import { Router } from "express"
import { generateDeck } from "../../controllers/deck-generator-controllers.js"

const router = Router()

// *** Root route is /api/generate-deck ***

// Generate a deck
router.post("/generate-deck", generateDeck)