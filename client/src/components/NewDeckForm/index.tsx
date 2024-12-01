// src/components/NewDeckForm/index.tsx

import styles from "./NewDeckForm.module.scss"

interface NewDeckFormProps {
  deckSettings: { deckName: string, format: string, colors: string[] }
  updateDeckSettings: (key: string, value: string | string[]) => void
  setShowForm: (showForm: boolean) => void
}

const NewDeckForm = ({ deckSettings, updateDeckSettings, setShowForm }: NewDeckFormProps) => {
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateDeckSettings('format', e.target.value)
  }

  const updateColors = (color: string) => {
    if (deckSettings.colors.includes(color)) {
      updateDeckSettings('colors', deckSettings.colors.filter((c) => c !== color))
    } else {
      updateDeckSettings('colors', [...deckSettings.colors, color])
    }
  }

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
    setShowForm(false)
	}

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<label className={styles.question} htmlFor="deckName">
          <p>Deck Name</p>
          <input
            type="text"
            id="deckName"
            value={deckSettings.deckName}
            onFocus={(e) => e.target.select()}
            onChange={(e) => updateDeckSettings('deckName', e.target.value)}
          />
        </label>

        <label className={styles.question} htmlFor="format">
          <p>Format</p>
          <select  name="format" id="format" value={deckSettings.format} onChange={handleSelectChange}>
            <option value="Standard">Standard</option>
            <option value="Commander">Commander</option>
          </select>
        </label>

				<fieldset className={`${styles.question} ${styles.radio}`} name="colors" id="colors">
					<legend>Select the colors of your deck</legend>
						<input id="white" onChange={() => updateColors('White')} defaultChecked={deckSettings.colors.includes('White')} type="Checkbox" name="colors" value="White" />
					<label htmlFor="white">
						<p>White</p>
					</label>
						<input id="black" onChange={() => updateColors('Black')} defaultChecked={deckSettings.colors.includes('Black')} type="Checkbox" name="colors" value="Black" />
          <label htmlFor="black">
						<p>Black</p>
					</label>
						<input id="blue" onChange={() => updateColors('Blue')} defaultChecked={deckSettings.colors.includes('Blue')} type="Checkbox" name="colors" value="Blue" />
					<label htmlFor="blue">
            <p>Blue</p>
					</label>
						<input id="red" onChange={() => updateColors('Red')} defaultChecked={deckSettings.colors.includes('Red')} type="Checkbox" name="colors" value="Red" />
					<label htmlFor="red">
						<p>Red</p>
					</label>
						<input id="green" onChange={() => updateColors('Green')} defaultChecked={deckSettings.colors.includes('Green')} type="Checkbox" name="colors" value="Green" />
          <label htmlFor="green">
						<p>Green</p>
					</label>
				</fieldset>
				<button type="submit">Create Deck</button>
			</form>
		</div>
	)
}

export default NewDeckForm
