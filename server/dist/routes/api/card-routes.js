import { Router } from "express";
import Card from "../../models/card.js";
import { Op } from "sequelize";
const router = Router();
// GET / - Get all cards using query parameters and pagination
router.get("/", async (req, res) => {
    const { name, type_line, oracle_text, subtype, color, cmc, power, toughness, page = 1, // default is page 1
    limit = 100, // default is 100 cards per page
     } = req.query;
    // Define filters object
    const filters = {};
    // Add filters to filters object
    if (name)
        filters.name = { [Op.iLike]: `%${name}%` }; // case-insensitive search
    if (type_line)
        filters.type_line = { [Op.iLike]: `%${type_line}%` }; // case-insensitive search
    if (oracle_text)
        filters.oracle_text = { [Op.iLike]: `%${oracle_text}%` }; // case-insensitive search
    if (subtype)
        filters.subtype = { [Op.iLike]: `%${subtype}%` }; // case-insensitive search
    if (color)
        filters.color = { [Op.or]: color }; // exact match
    if (cmc)
        filters.cmc = cmc; // exact match
    if (power)
        filters.power = power; // exact match
    if (toughness)
        filters.toughness = toughness; // exact match
    // Define pagination variables
    const offset = (page - 1) * limit;
    // Find and count all cards
    try {
        const { count, rows } = await Card.findAndCountAll({ where: filters, offset, limit: limit });
        res.status(200).json({
            total_cards: count, // total number of cards
            cards: rows, // array of cards
            has_more: count > offset + rows.length, // boolean - true if there are more cards
            next_page: // link to next page
            count > offset + rows.length
                ? `/api/cards?page=${page + 1}&limit=${limit}`
                : null,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// GET /:id - Get card by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const card = await Card.findByPk(id);
        if (card) {
            res.json(card);
        }
        else {
            res.status(404).json({ error: "Card not found" });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
export { router as cardRouter };
