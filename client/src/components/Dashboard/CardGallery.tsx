//src/components/Dashboard/CardGallery.tsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './Dashboard.module.scss'; 
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
type CardCarouselProps = {
  displayedCards: Card[];
}

const CardCarousel: React.FC<CardCarouselProps> = ({}) => {

  // State to store displayed cards
  const [displayedCards, setDisplayedCards] = useState<Card[]>([])

  const navigate = useNavigate()

  // State to manage loading and error states
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
  const fetchCards = async () => {
    try {
      const response = await fetch('/api/cards')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const filters = {
        name: '',
        limit: 10
      }

      const data = await getAllCards(filters)
      setDisplayedCards(data)
    } catch (err) {
      setError("Failed to load cards")
      setLoading(false)
    }
  }
  
    fetchCards()
  }, [])
// Fallback UI if no cards are available 
   if (!displayedCards || displayedCards.length === 0) {
    return (
      <div>
        <h1 className={styles.message}>Start browsing for your next Legendary creature</h1>
        <button className={styles.button} onClick={() => navigate("/cards")}>Browse Cards</button>
      </div>
    )}

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