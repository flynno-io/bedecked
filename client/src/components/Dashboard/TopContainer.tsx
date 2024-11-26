// import React from 'react'
import { GiCardPlay } from "react-icons/gi";
import styles from './Dashboard.module.scss'

function TopContainer() {
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

        </div>
    </div>
)
}

export default TopContainer