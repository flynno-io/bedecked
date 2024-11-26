import { Router } from "express"
import type { Request, Response } from "express"
import Deck from "../../models/deck.js"
import { WhereOptions, Op } from "sequelize"

const router = Router()

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

// GET / - Get all decks using query parameters and pagination
router.get("/", async (req: Request, res: Response): Promise<void> => {
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
    const { count, rows } = await Deck.findAndCountAll({ where: filters, offset, limit: limit })
    res.status(200).json({
      total_decks: count, // total number of decks
      decks: rows, // array of decks
      has_more: count > offset + rows.length, // boolean - true if there are more decks
      next_page: // link to next page
        count > offset + rows.length
          ? `${req.protocol}://${req.get("host")}${req.baseUrl}?page=${page + 1}&limit=${limit}`
          : null,
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

// GET /:id - Get deck by ID
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const deck = await Deck.findByPk(id)
    if (deck) {
      res.json(deck)
    } else {
      res.status(404).json({ error: "Deck not found" })
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

// POST / - Create a new deck
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { name, format, colors, userId } = req.body
  try {
    const deck = await Deck.create({ name, format, colors, userId })
    res.status(201).json(deck)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

// PUT /:id - Update deck by ID
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
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
})

// DELETE /:id - Delete deck by ID
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
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
})

export { router as deckRouter }
