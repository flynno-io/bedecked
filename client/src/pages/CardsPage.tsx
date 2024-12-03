// src/pages/CardsPage.tsx
import { useState, useEffect } from "react"
import TopContainer from "../components/Card/TopContainer"
import CardGallery from "../components/Card/CardGallery"
import { getAllCards } from "../api/mtgAPI"
import { useNavigate } from "react-router-dom"

type Card = {
	id: string
	name: string
	image_uris: {
		small: string
	}
	cmc: number
	in_deck?: boolean
}

function CardsPage() {
	const [displayedCards, setDisplayedCards] = useState<Card[]>([])
	const navigate = useNavigate()

	// State to manage loading and error states
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const data = await getAllCards({ name: "", limit: 10 })
				console.log("cardGallery data:", data.cards)
				setDisplayedCards(data.cards)
			} catch (err: unknown) {
				if (err instanceof Error && err.message.includes("401")) {
					setError("Unauthorized: Please log in again.")
					navigate("/login")
				} else {
					setError("Failed to load cards")
				}
			}
		}
		fetchCards()
	}, [])

	const handleSearch = (query: string) => {
		// filter cards based on the search query
		const newDisplayedCards = displayedCards.filter((card) =>
			card.name.toLowerCase().includes(query.toLowerCase())
		)
		setDisplayedCards(newDisplayedCards)
	}

	// Filtering/sorting handlers
	const sortAlphabetically = () => {
		const sortedCards = [...displayedCards].sort((a, b) =>
			a.name.localeCompare(b.name)
		)
		setDisplayedCards(sortedCards)
		console.log("Sorted A to Z")
	}

	const sortByMana = () => {
		const sortedCards = [...displayedCards].sort((a, b) => a.cmc - b.cmc)
		setDisplayedCards(sortedCards)
		console.log("Sorted by Mana")
	}

	const sortByCost = () => {
		const sortedCards = [...displayedCards].sort((a, b) => b.cmc - a.cmc)
		setDisplayedCards(sortedCards)
		console.log("Sorted by Cost")
	}

	return (
		<div>
			{error ? (
				<p>{error}</p>
			) : (
				<>
					<TopContainer
						sortAlphabetically={sortAlphabetically}
						sortByMana={sortByMana}
						sortByCost={sortByCost}
						onSearch={handleSearch}
						// sortByDateAdded={sortByDateAdded}
						// filterByDeck={filterByDeck}
					/>
					<CardGallery displayedCards={displayedCards} />
				</>
			)}
		</div>
	)
}

export default CardsPage
