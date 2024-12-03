import { useNavigate } from "react-router-dom"
import { GiCardPick } from "react-icons/gi"
import styles from "./Dashboard.module.scss"

function BottomContainer() {
	const navigate = useNavigate()

	const handleClick = () => {
		console.log("Navigating to the Decks Page")
		navigate("/decks")
	}

	return (
	<div>
	
    <div>
        <div className={styles.bottomContainer}>
             <div className={styles.title}>
                       
                    {/* onClick handler to title */}
                    <h2 className={styles.clickableTitle} onClick={handleClick}>
                        <i className={styles.icon} >
                            <GiCardPick/>
                        </i> 
                        YOUR DECKS
                    </h2>


					{/* Buttons for filtering/sorting */}
					<button className={styles.button}>A to Z</button>
					<button className={styles.button}>Mana</button>
					<button className={styles.button}>Color</button>
					<button className={styles.button}>Date Added</button>
				</div>
			</div>
		</div>
	</div>
	)
}

export default BottomContainer
