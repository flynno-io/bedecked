// src/components/ManaSelector/index.tsx
import { useState } from "react"
import styles from "./ManaSelector.module.scss"

interface ManaSelectorProps {
	selectedMana: string[]
	handleChange: (mana: string[]) => void
}

const ManaSelector = ({ selectedMana, handleChange }: ManaSelectorProps) => {
	const [mana, setMana] = useState(selectedMana)

	const handleSelection = (newMana: string) => {
		if (mana.includes(newMana)) {
			setMana((prevMana) => prevMana.filter((m) => m !== newMana))
		} else {
			setMana((prevMana) => [...prevMana, newMana])
		}
		handleChange(mana)
	}

	return (
		<div className={styles.container}>
      <div className={styles.title}>Mana Type</div>
			<div className={styles.manaSelector}>
				{["W", "U", "B", "R", "G"].map((m) => (
					<button
            key={m}
						className={`${mana.includes(m) ? styles.selected : ""} ${
							styles[m.toLowerCase()]
						} ${styles.manaButton}`}
						onClick={() => handleSelection(m)}
					>
						{m}
					</button>
				))}
			</div>
		</div>
	)
}

export default ManaSelector
