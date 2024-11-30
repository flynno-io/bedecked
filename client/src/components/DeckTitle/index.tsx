// src/components/DeckTitle/index.tsx
import { useState } from "react"
import { TbCardsFilled } from "react-icons/tb"
import { FiEdit2 } from "react-icons/fi"

import styles from "./DeckTitle.module.scss"

interface DeckTitleProps {
	deckName: string
  setDeckName: (deckName: string) => void
}

const DeckTitle = ({ deckName, setDeckName }: DeckTitleProps) => {
	const [editTitle, setEditTitle] = useState(false)

  const toggleEdit = (event: React.KeyboardEvent<SVGElement> | React.MouseEvent<HTMLButtonElement> | React.MouseEvent<SVGElement>) => {
    event.stopPropagation()
    const { key, type } = event as React.KeyboardEvent<SVGElement>
    if (type === 'keydown' && key === 'Enter' ) {
      setEditTitle(!editTitle)
    }
    if (type === 'click') {
      setEditTitle(!editTitle)
    }
  }

	return (
		<div className={styles.container}>
			<TbCardsFilled className={styles.icon} />
			<div className={styles.editContainer}>
				{editTitle ? (
					<div className={styles.titleContainer}>
						<input
              tabIndex={0}
							type="text"
							value={deckName}
							onChange={(e) => setDeckName(e.target.value)}
              autoFocus
						/>
            <button tabIndex={0} onClick={toggleEdit}>
              Save
            </button>
					</div>
				) : (
					<div className={styles.titleContainer}>
						<h2>{deckName} Deck</h2>
						<FiEdit2 tabIndex={0} className={styles.actionIcon} onClick={toggleEdit} onKeyDown={toggleEdit} />
					</div>
				)}
			</div>
		</div>
	)
}

export default DeckTitle
