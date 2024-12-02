// src/pages/CardsPage.tsx
import { useState, useEffect } from 'react';
import TopContainer from "../components/Card/TopContainer";
import CardGallery from '../components/Card/CardGallery';
import styles from '../components/card/card.module.scss';
import { getAllCards } from '../api/mtgAPI';

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
    const [displayedCards, setDisplayedCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchCards = async () => {
        try {
          const filters = {
            id: '',
            limit: 100
          }
          const cards = await getAllCards(filters)
          setDisplayedCards(cards)
        } catch (err) {
          setError("Failed to load cards")
        } finally {
          setLoading(false)
        }
      }

      fetchCards()
    }, [])

    const handleSearch = (query: string) => {
      // filter cards based on the search query 
      const newDisplayedCards = displayedCards.filter((card) => card.name.toLowerCase().includes(query.toLowerCase()));
      setDisplayedCards(newDisplayedCards);
    };

    // Filtering/sorting handlers
    const sortAlphabetically = () => {
      const sortedCards = [...displayedCards].sort((a, b) => a.name.localeCompare(b.name));
      setDisplayedCards(sortedCards);
      console.log('Sorted A to Z');
    };

    const sortByMana = () => {
        const sortedCards = [...displayedCards].sort((a, b) => a.cmc - b.cmc);
        setDisplayedCards(sortedCards);
        console.log('Sorted by Mana');
    };

    const sortByCost = () => {
        const sortedCards = [...displayedCards].sort((a, b) => b.cmc - a.cmc);
        setDisplayedCards(sortedCards);
        console.log('Sorted by Cost');
    };
    
  if (loading) return <p className={styles.message}>Loading cards...</p>
  if (error) return <p className={styles.message}>Error loading cards: {error}</p>

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