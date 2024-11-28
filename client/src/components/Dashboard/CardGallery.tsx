// import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './Dashboard.module.scss'; 
import Cards from '../../assets/Cards/Cards.json';

const CardCarousel = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <Carousel 
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
    >
      
    <div className={styles.cardContainer}>
        {Cards && Cards.map((card) => {
            return(
                <div className={styles.card} key={card.id}>
                    {card.image_uris && <img src={card.image_uris.small} alt={card.name}/>}
                </div>
            )
        })}
    </div>
    
    </Carousel>
  );
};

export default CardCarousel;