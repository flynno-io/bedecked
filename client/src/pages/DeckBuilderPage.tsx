// src/pages/DeckBuilderPage.tsx
import { useState, CSSProperties } from "react"
import DeckBuilder from "../components/DeckBuilder"
import DeckTitle from "../components/DeckTitle"
import NewDeckForm from "../components/NewDeckForm"
import '../../styles/_themes.scss'

const DeckBuilderPage = () => { 

  // useState hook to manage the deck settings
	const [deckSettings, setDeckSettings] = useState<{
		deckName: string
		format: string
		colors: string[]
	}>({ deckName: "Untitled", format: "", colors: [] })
	const [showForm, setShowForm] = useState(true)

	// Inline styles for the deck builder wrapper
	const styles: { [key: string]: CSSProperties } = {
		deckBuilderWrapper: {
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-start",
			gap: "1rem",
			padding: "1rem",
			border: "1px solid #ccc",
			borderRadius: "5px",
			boxShadow: "0 0 5px 0 #ccc",
			backgroundColor: "var(--bg-color)",
			width: "100%",
		},
	}

  // Update the deck settings and close the New Deck Form
	const updateDeckSettings = (key: string, value: string | string[]) => {
		setDeckSettings((prev) => ({ ...prev, [key]: value }))
	}

  const setDeckName = (deckName: string) => {
    setDeckSettings({ ...deckSettings, deckName })
  }

	return (
		<>
			{showForm ? (
				<NewDeckForm
					deckSettings={deckSettings}
					updateDeckSettings={updateDeckSettings}
          setShowForm={setShowForm}
				/>
			) : (
				<div style={styles.deckBuilderWrapper}>
					<DeckTitle deckName={deckSettings.deckName} setDeckName={setDeckName} />
					<DeckBuilder />
				</div>
			)}
		</>
	)
}

export default DeckBuilderPage
