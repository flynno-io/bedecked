// src/pages/DashboardPage.tsx
// import "Dashboard.scss";
import TopContainer from "../components/Dashboard/TopContainer";
import BottomContainer from "../components/Dashboard/BottomContainer";
import styles from '../components/Dashboard/Dashboard.module.scss';

const DashboardPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <TopContainer />  
      </div>
      
      <BottomContainer />
    </div>
  )
}

export default DashboardPage

