// src/pages/CardsPage.tsx
import React, { useState } from 'react';
import TopContainer from "../components/Card/TopContainer";
import CardGallery from '../components/Dashboard/CardGallery';
import Cards from '../assets/Cards/Cards.json';

type Card ={
  id: string;
  name: string; 
  image_uris: {
      small: string; 
  };
  cmc: number;
  in_deck?: boolean;
}

function CardsPage() {
    const [displayedCards, setDisplayedCards] = useState<Card[]>(Cards);

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
    </div>
    
  )
}

export default CardsPage