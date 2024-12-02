import { Router } from "express"
import { getAllCards, getCardById } from "../../controllers/card-controllers.js"

const router = Router()

// GET / - Get all cards using query parameters and pagination
router.post("/", getAllCards)

// GET /:id - Get card by ID
router.get("/:id", getCardById)

export { router as cardRouter }