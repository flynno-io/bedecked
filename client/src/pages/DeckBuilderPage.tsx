// src/pages/DeckBuilderPage.tsx
import DeckBuilder from "../components/DeckBuilder"
import DeckTitle from "../components/DeckTitle"

const DeckBuilderPage = () => {
  return (
    <>
      <DeckTitle deckName="Deck Name" />
      <DeckBuilder />
    </>
  )
}

export default DeckBuilderPage