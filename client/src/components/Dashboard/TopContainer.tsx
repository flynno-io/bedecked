import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { GiCardPlay } from "react-icons/gi";
import styles from './Dashboard.module.scss'

function TopContainer() {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    
    async function fetchCards() {
        const response = await fetch('https://api.scryfall.com/bulk-data')
        if (!response.ok) {
            throw new Error('Network response was not ok');
            }
    
        return await response.json();
    }

    useEffect(() => {
        fetchCards()
        .then(data => console.log(data))
        .catch(error => console.error(error))
    }, [])
    
return (
    <div className={styles.topContainer}>
        <div className={styles.sectionTitle}>
            <div className={styles.title}>
                <i className={styles.icon} >
                    <GiCardPlay/>
                </i>    
                <h2>Cards</h2>
                <button className={styles.button}>A to Z</button>
                <button className={styles.button}>Mana</button>
                <button className={styles.button}>Cost</button>
                <button className={styles.button}>Date Added</button>
                <button className={styles.button}>Deck</button>
            </div>
        </div>
        <div className={styles.cardContainer}>
            <Carousel responsive={responsive}>
                <div className="card">
                    Item 1
                </div>
            </Carousel>
        </div>
    </div>
)
}

export default TopContainer