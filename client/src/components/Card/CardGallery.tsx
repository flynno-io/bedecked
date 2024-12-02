// src/components/Card/CardGallery.tsx

import React from 'react';
import { useState, useEffect } from 'react';
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

const CardGallery: React.FC<CardGalleryProps> = () => {
  const [displayedCards, setDisplayedCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCards()
  }, [])

  if (loading) return <p className={styles.message}>Loading cards...</p>
  if (error) return <p className={styles.message}>Error loading cards: {error}</p>

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

      {displayedCards.map((card) => (
        <div className={styles.card} key={card.id}>
          {card.image_uris && (
            <img src={card.image_uris.small} alt={card.name} />
          )}
          <p className={styles.cardName}>{card.name}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default CardGallery;