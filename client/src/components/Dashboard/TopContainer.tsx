// import React, { useState, useEffect } from 'react'
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import { GiCardPlay } from "react-icons/gi";
import styles from './Dashboard.module.scss'; 
import Card from '../Card/Card';

const cardData = [
    { id: 1, name: "Black Lotus", manaCost: "0", type: "Artifact" },
    { id: 2, name: "Blue Elemental Blast", manaCost: "U", type: "Instant" },
    { id: 3, name: "Lightning Bolt", manaCost: "R", type: "Instant" },
    // Add more card objects...
  ];

function TopContainer() { 

return (
    <div>
    <div className={styles.topContainer}>

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
            {cardData.map((card) => (
                <Card key={card.id} {...card} />
            ))};
        </div>
    </div>
    
)
}

export default TopContainer