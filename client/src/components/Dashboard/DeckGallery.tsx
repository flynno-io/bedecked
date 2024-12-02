import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import cards from '../../../../server/db/cards.json';
import styles from './Dashboard.module.scss';

interface Card {
    cardId: number;
    count: number; 
}

const DeckCarousel = () => {
    const Decks: Card[] = cards.cards;
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
      showDots={false}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
  >
      {Decks.map((card: Card) => {
          return(
              <div className={styles.card} key={card.cardId}>
                
              </div>
          )
      })}
    
    </Carousel>
      
  );
};

export default DeckCarousel;
