// src/pages/DashboardPage.tsx
import { useState } from 'react';
import TopContainer from "../components/Dashboard/TopContainer";
import BottomContainer from "../components/Dashboard/BottomContainer";
import CardGallery from "../components/Dashboard/CardGallery";

type Card = {
  id: string;
  name: string;
  image_uris: {
    small: string;
  };
  cmc: number;
  in_deck?: boolean;
}

// type Deck = {
  // id: string; 
  // name: string; 
  // cards: Card[];
// }

function DashboardPage() {

  // State to store displayed cards and decks
  const [displayedCards, setDisplayedCards] = useState<Card[]>([])
  // const [displayedDecks] = useState<Card[]>(Cards)

  // if (!displayedDecks || displayedDecks.length === 0) {
  //   return (
  //     <div>
  //       <h1>Start building your first deck</h1>
  //       <button onClick={() => navigate("/decks")}>Deck Builder</button>
  //     </div>
  //   )}  

  // Sort cards alphabetically by name
  const sortAlphabetically = () => {
    const sortedCards = [...displayedCards].sort((a, b) => a.name.localeCompare(b.name))
    setDisplayedCards(sortedCards)
    console.log('Sorted A to Z')
  }

  // Sort cards by mana (low to high)
  const sortByMana = () => {
      const sortedCards = [...displayedCards].sort((a, b) => a.cmc - b.cmc);
      setDisplayedCards(sortedCards);
      console.log('Sorted by Mana');
  };

  // Sort cards by mana cost (high to low)
  const sortByCost = () => {
      const sortedCards = [...displayedCards].sort((a, b) => b.cmc - a.cmc);
      setDisplayedCards(sortedCards);
      console.log('Sorted by Cost');
  };

  // const filterByDeck = () => {
  //     const filteredCards = Cards.filter((card) => card.in_deck);
  //     setDisplayedCards(filteredCards);
  //     console.log('Filtered by Deck');
  


return (
  <div>
      <TopContainer 
          sortAlphabetically={sortAlphabetically}
          sortByMana={sortByMana}
          sortByCost={sortByCost}
          // filterByDeck={filterByDeck}

      />
      <CardGallery displayedCards={displayedCards}/>
      <BottomContainer />
      {/* <DeckGallery /> */}
  </div>

)
}

export default DashboardPage

