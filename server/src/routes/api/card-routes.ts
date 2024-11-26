import { Router } from "express"
import type { Request, Response } from "express"
import { Card } from "../../models"
import { Op } from "sequelize"

const router = Router()

interface filters {
	name?: { [Op.iLike]: string }
	type_line?: { [Op.iLike]: string }
	oracle_text?: { [Op.iLike]: string }
	subtype?: { [Op.iLike]: string }
	color?: "W" | "U" | "B" | "R" | "G" | "C" | "M" // white, blue, black, red, green, colorless, multicolor
	cmc?: number // converted mana cost
	power?: number
	toughness?: number
	page?: number
	limit?: number
}

// GET / - Get all cards using query parameters and pagination
router.get("/", async (req: Request, res: Response): Promise<void> => {
	const {
		name,
		type_line,
		oracle_text,
		subtype,
		color,
		cmc,
		power,
		toughness,
		page = 1, // default is page 1
		limit = 100, // default is 100 cards per page
	} = req.query as filters

	// Define filters object
	const where: filters = {}

	// Add filters to where object
	if (name) where.name = { [Op.iLike]: `%${name}%` } // case-insensitive search
	if (type_line) where.type_line = { [Op.iLike]: `%${type_line}%` } // case-insensitive search
	if (oracle_text) where.oracle_text = { [Op.iLike]: `%${oracle_text}%` } // case-insensitive search
	if (subtype) where.subtype = { [Op.iLike]: `%${subtype}%` } // case-insensitive search
	if (color) where.color = color // exact match
	if (cmc) where.cmc = cmc // exact match
	if (power) where.power = power // exact match
	if (toughness) where.toughness = toughness // exact match

	// Define pagination variables
	const offset = (page - 1) * limit

	// Find and count all cards
	try {
		const { count, rows } = await Card.findAndCountAll({ where, offset, limit: limit })
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
})
