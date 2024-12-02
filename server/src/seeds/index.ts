import sequelize from "../config/connection.js"
import { seedUsers } from "./user-seeds.js"
import { seedDecks } from "./deck-seeds.js"
import fetchScryfallData from "../scripts/fetch-scryfall-data/fetchData.js"

const seedAll = async (): Promise<void> => {
	try {
		await sequelize.sync({ force: true }) // force: true will drop and recreate all tables on every sync

		console.log("\n----- DATABASE SYNCED -----\n")

		await seedUsers()
		console.log("\n----- USERS SEEDED -----\n")

		await fetchScryfallData()
		console.log("\n----- CARDS SEEDED -----\n")

		// TODO: create seed functions for the decks
		await seedDecks()
		console.log("\n----- DECKS SEEDED -----\n")

		// TODO: create seed functions for the deck cards
		// await seedDeckCards();
		// console.log('\n----- DECKS & CARD RELATIONS SEEDED -----\n');

		// TODO: create seed functions for the emblems
		// await seedEmblems();
		// console.log('\n----- EMBLEMS SEEDED -----\n');

		process.exit(0)
	} catch (error) {
		console.error("Error seeding database:", error)
		process.exit(1)
	}
}

seedAll()
