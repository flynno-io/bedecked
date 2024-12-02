// src/pages/DashboardPage.tsx

import { useNavigate } from 'react-router-dom';
import BottomContainer from "../components/Dashboard/BottomContainer";
import styles from './Dashboard.module.scss';

function DashboardPage() {
  const navigate = useNavigate()
  
return (
  <div>
    <div>
        <h1 className={styles.message}>Start browsing for your next Legendary creature</h1>
        <button className={styles.button} onClick={() => navigate("/cards")}>Browse Cards</button>
      </div>
      <BottomContainer />
      {/* <DeckGallery /> */}
  </div>

)
}

export default DashboardPage

