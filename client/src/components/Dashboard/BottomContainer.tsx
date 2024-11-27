// import React, { useState, useEffect } from 'react'
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import { GiCardPick } from 'react-icons/gi';
import styles from './Dashboard.module.scss'

function BottomContainer() {

  return (
    <div>
        <div className={styles.bottomContainer}>
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
            <p>Deck Gallery</p>
            <p>deck1</p>
            <p>deck1</p>
            <span>deck1</span>
        </div>
    </div>
    
)
}

export default BottomContainer