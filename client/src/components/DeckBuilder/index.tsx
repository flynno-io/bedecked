// src/components/DeckBuilder/index.tsx

import ManaSelector from "../ManaSelector"
import Select from "../Select"
import styles from "./DeckBuilder.module.scss"

interface DeckBuilderProps {
  deckSettings: {
    deckName: string
    format: string
    colors: string[]
    creatureType: string[]
    creatureMix: number
    landMix: number
    spellMix: number
  }
  updateDeckSettings: (key: string, value: string | string[] | number) => void
  handleGenerateDeck: () => void
}

const DeckBuilder = ({ deckSettings, updateDeckSettings, handleGenerateDeck}: DeckBuilderProps) => {
  
  const handleFormatChange = (format: string | string[] | number) => {
    updateDeckSettings("format", format)
  }

  const handleManaChange = (mana: string[]) => {
    updateDeckSettings("colors", mana)
  }


  return (
    <div className={styles.container}>
      <Select
        name="Deck Format"
        selectedValue={deckSettings.format}
        values={["Standard", "Commander"]}
        handleChange={handleFormatChange}
      />
      <ManaSelector selectedMana={deckSettings.colors} handleChange={handleManaChange}/>
    </div>
  )
}

export default DeckBuilder