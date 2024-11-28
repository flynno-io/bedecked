import React from 'react'
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import { useNavigate } from 'react-router-dom';
import { GiCardPick } from 'react-icons/gi';
import styles from './Dashboard.module.scss'

function BottomContainer() {

    const navigate = useNavigate();

    const handleClick = () => {
        console.log('Navigating to the Decks Page');
        navigate('/decks')
    }
    
  return (
    <div>
        <div className={styles.bottomContainer}>
             <div className={styles.title}>
                       
                    {/* onClick handler to title */}
                    <h2 onClick={handleClick} className={styles.clickableTitle}>
                        <i className={styles.icon} >
                            <GiCardPick/>
                        </i> 
                        Decks
                    </h2>

                    {/* Buttons for filtering/sorting */}
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