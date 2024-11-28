import sequelize from "../../config/connection.js"
import fetchScryfallData from "./fetchData.js"

// Define the main function
async function updateScryfallData(): Promise<void>{
	try {
		console.log("Connecting to the database...")
		await sequelize.authenticate()

		console.log("Starting data fetch and seed process...")
		await fetchScryfallData() // Call the fetchScryfallData function

		console.log("Closing the database connection...")
		await sequelize.close()
    process.exit(0)

	} catch (error) {
		if (error instanceof Error) {
			console.error("Error:", error.message)
		} else {
			console.error("Unexpected error:", error)
		}
		process.exit(1)
	}
}

// Call the main function
updateScryfallData()
