// src/pages/DashboardPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopContainer from "../components/Dashboard/TopContainer";
import BottomContainer from "../components/Dashboard/BottomContainer";
import CardGallery from "../components/Dashboard/CardGallery";
// import Cards from '../../../server/db/card.test.json';
import { getAllCards } from '../api/mtgAPI';
import styles from '../../src/components/Dashboard/Dashboard.module.scss';

type Card ={
  id: string;
  name: string; 
  image_uris: {
      small: string; 
  };
  cmc: number;
  in_deck?: boolean;
  favorited?: boolean;
}

function DashboardPage() {
    const [displayedCards, setDisplayedCards] = useState<Card[]>([])
    const [displayedDecks] = useState<Card[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
      const loadData = async () => {
        try {
          setLoading(true);
          const filters = { page: 1, limit: 100 };
          const data = await getAllCards(filters);
          setDisplayedCards(data.cards);
          setLoading(false);
        } catch (error) {
          console.error('Error loading data', error)
          setError('Failed to load cards');
          setLoading(false);
        }
      };
    loadData();
    }, []);

    if (loading) {
      return <div className={styles.message}>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    if (!displayedCards || displayedCards.length === 0) {
    return (
      <div className={styles.title}>
        <h1 className={styles.message}>Start browsing for your next Legendary creature</h1>
        <button className={styles.button} onClick={() => navigate("/cards")}>Browse Cards</button>
      </div>
    )}

  if (!displayedDecks || displayedDecks.length === 0) {
    return (
      <div className={styles.title}>
        <h1 className={styles.message}>Start building your first deck</h1>
        <button className={styles.button} onClick={() => navigate("/deck-builder")}>Deck Builder</button>
      </div>
    )}  

    // Filtering/sorting handlers
    // const filterFavoritedCards = () => {
      // const filteredCards = Cards.filter((card) => card.favorited);
      // setDisplayedCards(filteredCards);
      // console.log('Filtered favorited cards')
    // }

    const sortAlphabetically = () => {
      const sortedCards = [...displayedCards].sort((a, b) => a.name.localeCompare(b.name))
      setDisplayedCards(sortedCards)
      console.log('Sorted A to Z')
    }

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

    // const sortByRarity = () => {
    //     const sortedCards = [...displayedCards].sort((a, b) => a.rarity.localeCompare(b.rarity));
    //     setDisplayedCards(sortedCards);
    //     console.log('Sorted by Rarity');
    // }

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
            // sortByRarity={sortByRarity}
            // filterByDeck={filterByDeck}

        />
        <CardGallery displayedCards={displayedCards}/>
        <BottomContainer />
        {/* <DeckGallery /> */}
    </div>
  
  )
}

export default DashboardPage

