// src/pages/DashboardPage.tsx
// import "Dashboard.scss";
import TopContainer from "../components/Dashboard/TopContainer";
import BottomContainer from "../components/Dashboard/BottomContainer";
import CardGallery from '../components/Dashboard/CardGallery';


const DashboardPage = () => {
  return (
    <div>
        <TopContainer />
        <CardGallery />
        <BottomContainer />
    </div>
  
  )
}

export default DashboardPage

