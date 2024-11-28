// src/pages/DashboardPage.tsx
import TopContainer from "../components/Dashboard/TopContainer";
import BottomContainer from "../components/Dashboard/BottomContainer";
import CardGallery from "../components/Dashboard/CardGallery";
// import DeckGallery from "../components/Dashboard/DeckGallery";

const DashboardPage = () => {
  return (
    <div>
        <TopContainer />
        <CardGallery />
        <BottomContainer />
        {/* <DeckGallery /> */}
    </div>
  
  )
}

export default DashboardPage

