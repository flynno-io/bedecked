import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { GiCardPlay } from "react-icons/gi";
import styles from './Dashboard.module.scss'; 
import Cards from '../../assets/Cards/Cards.json';

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
            {Cards.map((card) => {
                return(
                    <div className={styles.card} key={card.id}>
                        {card.image_uris && <img src={card.image_uris.small} alt={card.name}/>}
                    </div>
                )
            })}
        </div>
    </div>
    
)
}

export default TopContainer