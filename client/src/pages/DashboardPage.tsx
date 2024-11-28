// src/pages/DashboardPage.tsx
import React, { useState } from 'react';
import TopContainer from "../components/Dashboard/TopContainer";
import BottomContainer from "../components/Dashboard/BottomContainer";
import CardGallery from "../components/Dashboard/CardGallery";
// import DeckGallery from "../components/Dashboard/DeckGallery";
import Cards from '../assets/Cards/Cards.json';

function DashboardPage() {
    const [displayedCards, setDisplayedCards] = useState(Cards);

    // Filtering/sorting handlers
    const sortAlphabetically = () => {
      const sortedCards = [...Cards].sort((a, b) => a.name.localeCompare(b.name));
      setDisplayedCards(sortedCards);
      console.log('Sorted A to Z');
    };

    const sortByMana = () => {
        const sortedCards = [...Cards].sort((a, b) => a.cmc - b.cmc);
        setDisplayedCards(sortedCards);
        console.log('Sorted by Mana');
    };

    const sortByCost = () => {
        const sortedCards = [...Cards].sort((a, b) => b.cmc - a.cmc);
        setDisplayedCards(sortedCards);
        console.log('Sorted by Cost');
    };

    // const sortByDateAdded = () => {
    //     const sortedCards = [...Cards].sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
    //     setDisplayedCards(sortedCards);
    //     console.log('Sorted by Date Added');
    // };

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
            // sortByDateAdded={sortByDateAdded}
            // filterByDeck={filterByDeck}

        />
        <CardGallery displayedCards={displayedCards}/>
        <BottomContainer />
        {/* <DeckGallery /> */}
    </div>
  
  )
}

export default DashboardPage

