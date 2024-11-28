// src/pages/DashboardPage.tsx
// import "Dashboard.scss";
import TopContainer from "../components/Dashboard/TopContainer";
import BottomContainer from "../components/Dashboard/BottomContainer";
import styles from '../components/Dashboard/Dashboard.module.scss';
import CardGallery from '../components/Dashboard/CardGallery';


const DashboardPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <TopContainer />
        <CardGallery />
      </div>
      <div className={styles.bottomContainer}>
        <BottomContainer />
      </div>
  
    </div>
  )
}

export default DashboardPage

