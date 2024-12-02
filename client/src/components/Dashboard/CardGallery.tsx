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
interface CardGalleryProps {
  displayedCards: Card[];
}

const CardCarousel: React.FC<CardGalleryProps> = ({ displayedCards }) => {

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

      {fetchedCards.map((card) => {
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