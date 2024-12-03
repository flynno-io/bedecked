// src/pages/DecksPage.tsx
import BottomContainer from "../components/Dashboard/BottomContainer";
import DeckGallery from "../components/Dashboard/DeckGallery";

const DecksPage = () => {
  return (
    <div>
      <BottomContainer/>
      {/* <DetailedDeckView/> */}
      <DeckGallery/>
    </div>
  )
}

export default DecksPage