import styles from "./Card.module.scss"

interface CardProps {
	name: string
	manaCost: number
	type: string
}

function Card({ name, manaCost, type }: CardProps) {
	return (
		<div className={styles.card}>
			<h3>{name}</h3>
			<p>Mana Cost: {manaCost}</p>
			<p>Type: {type}</p>
		</div>
	)
}

export default Card
