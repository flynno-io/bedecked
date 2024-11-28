import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GiCardPlay } from "react-icons/gi";
import styles from './Dashboard.module.scss'; 

function TopContainer() { 
    const navigate = useNavigate();

    const handleClick = () => {
        console.log('Navigating to the Cards Page');
        navigate('/cards')
    }

return (
    <div>
        <div className={styles.topContainer}>
            <div className={styles.title}>

                {/* onClick handler to title */}
                <h2 onClick={handleClick} className={styles.clickableTitle}>
                    <i className={styles.icon}>
                        <GiCardPlay/>
                    </i>
                    Cards
                </h2>

                {/* Buttons for filtering/sorting */}
                <button className={styles.button}>A to Z</button>
                <button className={styles.button}>Mana</button>
                <button className={styles.button}>Cost</button>
                <button className={styles.button}>Date Added</button>
                <button className={styles.button}>Deck</button>
            </div>
        </div>
    </div>
)
}

export default TopContainer