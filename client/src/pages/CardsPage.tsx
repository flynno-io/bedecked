// src/pages/CardsPage.tsx
import { useState } from 'react';
import TopContainer from "../components/Card/TopContainer";
import CardGallery from '../components/Dashboard/CardGallery';
import Cards from '../../../server/db/card.test.json';

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

    const handleSearch = (query: string) => {
      // filter cards based on the search query 
      const newDisplayedCards = Cards.filter((card) => card.name.toLowerCase().includes(query.toLowerCase()));
      setDisplayedCards(newDisplayedCards);
    };

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
            onSearch={handleSearch}
            // sortByDateAdded={sortByDateAdded}
            // filterByDeck={filterByDeck}

        />
      <CardGallery displayedCards={displayedCards}/>
    </div>
    
  )
}

export default CardsPage