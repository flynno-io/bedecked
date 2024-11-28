// src/App.tsx
import { Outlet } from "react-router-dom"
import styles from './App.module.scss'
import SideNav from "./components/SideNav"


function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <a href="/">
          Bedecked
        </a>
        <span>
          Compile your Magic!
        </span>
        </header>
      <div className={styles.sideMenu}>
        <SideNav/>
      </div>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>© 2024 Bedecked</p>
      </footer>
    </div>
  )
}

export default App
