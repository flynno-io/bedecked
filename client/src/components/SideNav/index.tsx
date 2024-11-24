// src/components/SideNav/index.tsx

import { Link } from "react-router-dom"
import styles from "./SideMenu.module.scss"

const SideMenu = () => {
	return (
		<nav className={styles.nav}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/cards">Cards</Link>
      <Link to="/decks">Decks</Link>
      <Link to="/deck-builder">Deck Builder</Link>
  </nav>
	)
}

export default SideMenu
