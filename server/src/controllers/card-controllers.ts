import type { Request, Response } from "express"
import { Card } from "../models/index.js"
import { Op, WhereOptions } from "sequelize"

// Define mana types
type mana = "W" | "U" | "B" | "R" | "G" | "C"  // mana types - white, blue, black, red, green, colorless

// Define filters interface
interface filters {
  name?: string
  type_line?: string
  oracle_text?: string
  subtype?: string
  colors?: mana[]
  cmc?: number
  power?: number
  toughness?: number
  page?: number
  limit?: number
}

// Get all cards using query parameters and pagination
export const getAllCards = async (req: Request, res: Response): Promise<void> => {
	const {
		name,
		type_line,
		oracle_text,
		subtype,
		colors,
		cmc,
		power,
		toughness,
		page = 1, // default is page 1
		limit = 100, // default is 100 cards per page
	} = req.body as filters

	// Define filters object
	const filters: WhereOptions = {}

	// Add filters to filters object
	if (name) filters.name = { [Op.iLike]: `%${name}%` } // case-insensitive search
	if (type_line) filters.type_line = { [Op.iLike]: `%${type_line}%` } // case-insensitive search
	if (oracle_text) filters.oracle_text = { [Op.iLike]: `%${oracle_text}%` } // case-insensitive search
	if (subtype) filters.subtype = { [Op.iLike]: `%${subtype}%` } // case-insensitive search
	if (colors) filters.colors = { [Op.contains]: colors} // exact match
	if (cmc) filters.cmc = cmc // exact match
	if (power) filters.power = power // exact match
	if (toughness) filters.toughness = toughness // exact match

	// Define pagination variables
	const offset = (page - 1) * limit

	// Find and count all cards
	try {
		const { count, rows } = await Card.findAndCountAll({ where: filters, offset, limit: limit })
		res.status(200).json({
			total_cards: count, // total number of cards
			cards: rows, // array of cards
			has_more: count > offset + rows.length, // boolean - true if there are more cards
			next_page: // link to next page
				count > offset + rows.length
					? `/api/cards?page=${page + 1}&limit=${limit}`
					: null,
		})
	} catch (error: any) {
		res.status(400).json({ error: error.message })
	}
}

// Get card by ID
export const getCardById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const card = await Card.findByPk(id)
    if (card) {
      res.json(card)
    } else {
      res.status(404).json({ error: "Card not found" })
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}