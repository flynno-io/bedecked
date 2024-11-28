import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GiCardPlay } from "react-icons/gi";
import styles from './Dashboard.module.scss'; 

function TopContainer({
    sortAlphabetically, 
    sortByMana,
    sortByCost,
    // onSortByDateAdded,
    // onFilterByDeck,
}) { 
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
                <h2 className={styles.clickableTitle} onClick={handleClick}>
                    <i className={styles.icon}>
                        <GiCardPlay/>
                    </i>
                    Cards
                </h2>

                {/* Buttons for filtering/sorting */}
                <button className={styles.button} onClick={sortAlphabetically}>A to Z</button>
                <button className={styles.button} onClick={sortByMana}>Mana</button>
                <button className={styles.button} onClick={sortByCost}>Cost</button>
                {/* <button className={styles.button} onClick={sortByDateAdded}>Date Added</button> */}
                {/* <button className={styles.button} onClick={onFilterByDeck}>Deck</button> */}
            </div>
        </div>
    </div>
)
}

export default TopContainer