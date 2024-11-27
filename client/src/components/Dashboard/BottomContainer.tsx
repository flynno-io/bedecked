// import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { GiCardPick } from 'react-icons/gi';
import styles from './Dashboard.module.scss'

function BottomContainer() {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
  return (
    <div className={styles.bottomContainer}>
        <div className={styles.sectionTitle}>
            <div className={styles.title}>
                <i className={styles.icon} >
                    <GiCardPick/>
                </i>    
                <h2>Decks</h2>
                <button className={styles.button}>A to Z</button>
                <button className={styles.button}>Mana</button>
                <button className={styles.button}>Color</button>
                <button className={styles.button}>Date Added</button>
            </div>
        </div>
        <div className={styles.deckContainer}>
            <Carousel responsive={responsive}>
                <div className="deck">
                    Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
                <div>Item 4</div>
            </Carousel>
        </div>
    </div>
)
}

export default BottomContainer