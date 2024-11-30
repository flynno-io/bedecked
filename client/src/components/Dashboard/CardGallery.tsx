import React, { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './Dashboard.module.scss'; 
import Cards from '../../../server/db/card.test.json';
// import { cardRouter } from '../../../../server/src/routes/api/card-routes.js';

type Card ={
    id: string;
    name: string; 
    image_uris: {
        small: string; 
    };
    cmc: number;
    in_deck?: boolean;
}

const CardCarousel: React.FC = () => {
  const [displayedCards, setDisplayedCards] = useState<Card[]>([])
  // const [loading, setLoading] = useState<boolean>(true)
  // const [error, setError] = useState<string | null>(null)

  // const fetchCards = async () => {
  //   try {
  //     const response = await fetch('/api/cards')
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`)
  //     }
  //     const data = await response.json()
  //     setDisplayedCards(data)
  //     setLoading(false)
  //   } catch (error) {
  //     setError("Failled to load cards")
  //     setLoading(false)
  //   }
  // }
  
  // useEffect(() => {
  //   fetchCards()
  // }, [])

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

  // if (loading) return <p>Loading cards...</p>
  // if (error) return <p>Error loading cards: {error}</p>

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

      {displayedCards.map((card) => {
          return(
              <div className={styles.card} key={card.id}>
                  {card.image_uris && <img src={card.image_uris.small} alt={card.name}/>}
              </div>
          )
      })}
    
    </Carousel>
      
  );
};

export default CardCarousel;