// src/components/Card/CardGallery.tsx

import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './card.module.scss'; 
import { getAllCards } from '../../api/mtgAPI';

type Card ={
    id: string;
    name: string; 
    image_uris: {
        small: string; 
    };
    cmc: number;
    in_deck?: boolean;
}

type CardGalleryProps = {
    displayedCards: Card[];
}

const CardGallery: React.FC<CardGalleryProps> = ({ displayedCards }) => {

  // State to store fetch cards
  const [fetchedCards, setFetchedCards] = useState<Card[]>([])
  const navigate = useNavigate()

  // State to manage loading and error states
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
  const fetchCards = async () => {
    try {
      const data = await getAllCards({name: '', limit: 10})
      setFetchedCards(data)
      setLoading(false)
      } catch (err: any) {
      if (err.message.includes('401')) {
      setError('Unauthorized: Please log in again.')
      navigate('/login')
      } else {
      setError("Failed to load cards")
    }
  }}
  
    if (!displayedCards.length) fetchCards()
  }, [displayedCards])

// Fallback UI if no cards are available
  if (loading) {
    return <p className={styles.message}>Loading cards...</p>
  }

  if (error) {
    return <p className={styles.message}>Error loading cards: {error}</p>
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <Carousel 
      arrows={true}
      swipeable={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
    >

      {Array.isArray(fetchedCards) && fetchedCards.map((card) => (
          <div className={styles.card} key={card.id}>
              {card.image_uris ? (
                <img src={card.image_uris.small} alt={card.name} />
              ) : (
                <p>No image available</p>
            )}
      </div>
      ))}
    </Carousel>
  );
};

export default CardGallery;