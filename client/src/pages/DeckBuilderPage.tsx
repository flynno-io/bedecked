// src/pages/DeckBuilderPage.tsx
import { useState } from "react"
import DeckBuilder from "../components/DeckBuilder"
import DeckTitle from "../components/DeckTitle"

const DeckBuilderPage = () => {
  const [deckName, setDeckName] = useState('untitled')
  return (
    <>
      <DeckTitle deckName={deckName} setDeckName={setDeckName} />
      <DeckBuilder />
    </>
  )
}

export default DeckBuilderPage