// import React, { useState, useEffect } from 'react'
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import { GiCardPlay } from "react-icons/gi";
import styles from './Dashboard.module.scss'; 

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
            <p>Card Gallery</p>
            <span>card1</span>
            <span>card2</span>
            <span>card3</span>
            <span>card4</span>
            <span>card5</span>
        </div>
    
    </div>
    
)
}

export default TopContainer