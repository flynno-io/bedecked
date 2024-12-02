import { Card } from "../../models/index.js"
import pLimit from "p-limit" // Import p-limit package

const BATCH_SIZE = 500 // Define batch size
const CONCURRENCY_LIMIT = 15 // Limit concurrent database operations

// Function to log memory usage
function logMemoryUsage(stage: string) {
  const memoryUsage = process.memoryUsage();
  console.log(`[${stage}] Memory Usage: RSS=${(memoryUsage.rss / 1024 / 1024).toFixed(2)}MB, HeapTotal=${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)}MB, HeapUsed=${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)}MB`);
}

export async function fetchScryfallData() {
	try {

    // (BASELINE) Log memory usage before fetching data
    logMemoryUsage("Before Fetching Data");

		// Fetch the bulk data list from Scryfall
		console.log("Fetching bulk data list...")
		const bulkDataResponse = await fetch("https://api.scryfall.com/bulk-data")
		if (!bulkDataResponse.ok) {
			throw new Error(
				`Failed to fetch bulk data: ${bulkDataResponse.statusText}`
			)
		}
		// Convert the response to JSON
		const bulkData = await bulkDataResponse.json()

		// Find the default_cards dataset from Scryfall
		const defaultCards = bulkData.data.find(
			(data: { type: string }) => data.type === "default_cards"
		)
		if (!defaultCards) {
			throw new Error("Default cards dataset not found!")
		}

		// Fetch the default_cards dataset
		console.log("Downloading cards data...")
		const cardsResponse = await fetch(defaultCards.download_uri)
		if (!cardsResponse.ok) {
			throw new Error(
				`Failed to download cards data: ${cardsResponse.statusText}`
			)
		}
		// Convert the response to JSON
		const cards = await cardsResponse.json()
		console.log(`Fetched ${cards.length} cards from Scryfall`)

    // (STAGE 1) Log memory usage after fetching data
    logMemoryUsage("After Fetching Data");

		// Process the cards data in batches
		console.log("Seeding data into the database...")
		const limit = pLimit(CONCURRENCY_LIMIT) // Limit concurrency

		// Initialize counters for created and updated records
		let created = 0
		let updated = 0

		for (let i = 0; i < cards.length; i += BATCH_SIZE) {
			const batch = cards.slice(i, i + BATCH_SIZE)

			// Use Promise.all to process the batch in parallel
			await Promise.all(
				batch.map((card: any) =>
					limit(async () => {
						try {
							const [_, isNewRecord] = await Card.upsert({
								scryFallId: card.id,
								name: card.name,
								cmc: card.cmc,
								colors: card.colors,
								color_identity: card.color_identity,
								power: card.power,
								toughness: card.toughness,
								oracle_text: card.oracle_text,
								image_uris: card.image_uris,
								rarity: card.rarity,
								flavor_text: card.flavor_text,
								mana_cost: card.mana_cost,
								type_line: card.type_line,
								scryfall_uri: card.scryfall_uri,
							})

							if (isNewRecord) {
								created += 1
							} else {
								updated += 1
							}
						} catch (cardError) {
							if (cardError instanceof Error) {
								console.error(
									`Error upserting card ${card.name}:`,
									cardError.message
								)
							} else {
								console.error(`Error upserting card ${card.name}:`, cardError)
							}
						}
					})
				)
			)

      // (STAGE 2) Log memory usage after processing batch
      logMemoryUsage(`After Processing Batch ${i / BATCH_SIZE + 1}`)

      // Log progress
			console.log(
				`Processed batch ${i / BATCH_SIZE + 1} of ${Math.ceil(
					cards.length / BATCH_SIZE
				)}`
			)
		}

    // (FINAL) Log memory usage after processing all batches
    logMemoryUsage('End of Processing');

    // Log the seeding results
		console.log(
			`Seeding complete: ${created} new records created, ${updated} records updated.`
		)
	} catch (error) {
    // Log memory usage when an error occurs
    logMemoryUsage('Error Occurred');
    
		if (error instanceof Error) {
			// Check if error is an instance of Error
			console.error("Error during data fetch and seed:", error.message)
		} else {
			console.error("Error during data fetch and seed:", error)
		}
	}
}

export default fetchScryfallData
