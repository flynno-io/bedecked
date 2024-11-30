// src/pages/DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopContainer from "../components/Dashboard/TopContainer";
import BottomContainer from "../components/Dashboard/BottomContainer";
import CardGallery from "../components/Dashboard/CardGallery";
// import DeckGallery from "../components/Dashboard/DeckGallery";
import Cards from '../../../server/db/card.test.json';
// TODO: import deck and card api classes from coming soon client/src/api

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

type Deck = {
  id: string; 
  name: string; 
  cards: Card[];
}

function DashboardPage() {
    const [displayedCards, setDisplayedCards] = useState<Card[]>(Cards)
    const [displayedDecks, setDisplayedDecks] = useState<Card[]>(Cards)
    const navigate = useNavigate()

    useEffect(() => {
      const loadData = async () => {
        try {
          // const cards = await cardRouter.get()
          // setDisplayedCards(cards || [])
          // setDisplayedDecks(decks || [])
        } catch (error) {
          console.error('Error loading data', error)
        }
      }
    loadData()
    }, [])

    if (!displayedCards || displayedCards.length === 0) {
    return (
      <div>
        <h1>Start browsing for your next Legendary creature</h1>
        <button onClick={() => navigate("/cards")}>Browse Cards</button>
      </div>
    )}

  if (!displayedDecks || displayedDecks.length === 0) {
    return (
      <div>
        <h1>Start building your first deck</h1>
        <button onClick={() => navigate("/decks")}>Deck Builder</button>
      </div>
    )}  

    // Filtering/sorting handlers
    const filterFavoritedCards = () => {
      const filteredCards = Cards.filter((card) => card.favorited);
      setDisplayedCards(filteredCards);
      console.log('Filtered favorited cards')
    }

    const sortAlphabetically = () => {
      const sortedCards = [...Cards].sort((a, b) => a.name.localeCompare(b.name))
      setDisplayedCards(sortedCards)
      console.log('Sorted A to Z')
    }

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

