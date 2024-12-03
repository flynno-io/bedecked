// src/components/Card/CardGallery.tsx

import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './card.module.scss'; 


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
      { displayedCards ? displayedCards.map((card) => (
        <div className={styles.card} key={card.id}>
            {card.image_uris ? (
              <img src={card.image_uris.small} alt={card.name} />
            ) : (
              <p>No image available</p>
          )}
        </div>
      )) : (
        <p>Loading cards...</p>
      )}
    </Carousel>
  );
};

export default CardGallery;