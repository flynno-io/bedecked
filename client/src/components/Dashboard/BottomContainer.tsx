// import React from 'react'
import { GiCardPick } from 'react-icons/gi';
import styles from './Dashboard.module.scss'

function BottomContainer() {
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

        </div>
    </div>
)
}

export default BottomContainer