import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select, { StylesConfig, MultiValue } from 'react-select';
import styles from "./NewDeckForm.module.scss";

interface OptionType {
  value: string;
  label: string;
}

interface NewDeckFormProps {
  deckSettings: {
    deckName: string;
    deckDescription?: string;
    format: string;
    colors: string[];
    creatureTypes?: string[];
    creatureCount?: number;
    landCount?: number;
    instantSorceryCount?: number;
  };
  updateDeckSettings: (key: string, value: string | string[] | number) => void;
  setShowForm: (showForm: boolean) => void;
}

const NewDeckForm = ({
  deckSettings,
  updateDeckSettings,
  setShowForm,
}: NewDeckFormProps) => {
  const [creatureTypeOptions, setCreatureTypeOptions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

// Custom styles for react-select
const customStyles: StylesConfig<OptionType, true> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: 'var(--inset-bg)',
    borderColor: state.isFocused ? 'var(--bg-color)' : 'var(--input-border)',
    borderWidth: '2px',
    boxShadow: 'none',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? 'var(--bg-color)' : 'var(--inset-bg)',
    color: state.isFocused ? 'var(--accent)' : 'var(--text-color)',
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: 'var(--multi-value-bg)',
    color: 'var(--text-color)',
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: 'var(--multi-value-color)',
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: 'var(--multi-value-remove-color)',
    ':hover': {
      backgroundColor: 'var(--multi-value-remove-hover-bg)',
      color: 'var(--multi-value-remove-hover-color)',
    },
  }),
};

const navigate = useNavigate();
const handleClick = () => {
  console.log('Navigating to Your Decks Page')
  navigate('/decks')
}

  // Fetch creature types from Scryfall API
  useEffect(() => {
    const fetchCreatureTypes = async () => {
      try {
        const response = await fetch(
          "https://api.scryfall.com/catalog/creature-types"
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch creature types: ${response.statusText}`);
        }
        const data = await response.json();
        // Map creature types into react-select options format
        setCreatureTypeOptions(data.data.map((type: string) => ({ value: type, label: type })));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatureTypes();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateDeckSettings("format", e.target.value);
  };

  const updateColors = (color: string) => {
    if (deckSettings.colors.includes(color)) {
      updateDeckSettings(
        "colors",
        deckSettings.colors.filter((c) => c !== color)
      );
    } else {
      updateDeckSettings("colors", [...deckSettings.colors, color]);
    }
  };

  const handleCreatureTypeChange = (selectedOptions: MultiValue<OptionType>) => {
    const selectedTypes = selectedOptions.map((option) => option.value);
    updateDeckSettings("creatureTypes", selectedTypes);
  };

  const handleInputChange = (key: string, value: string | number) => {
    updateDeckSettings(key, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
  };

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
            onChange={(e) => updateDeckSettings("deckName", e.target.value)}
          />
        </label>

        <label className={styles.question} htmlFor="deckDescription">
          <p>Description</p>
          <input
            type="text"
            id="deckDescription"
            value={deckSettings.deckDescription}
            onFocus={(e) => e.target.select()}
            onChange={(e) => updateDeckSettings("deckDescription", e.target.value)}
          />
        </label>

        <label className={styles.question} htmlFor="format">
          <p>Format</p>
          <select
            name="format"
            id="format"
            value={deckSettings.format}
            onChange={handleSelectChange}
          >
            <option value="Standard">Standard</option>
            <option value="Commander">Commander</option>
          </select>
        </label>

        <fieldset
          className={`${styles.question} ${styles.radio}`}
          name="colors"
          id="colors"
        >
          <legend>Select the colors of your deck</legend>
          <input
            id="white"
            onChange={() => updateColors("White")}
            defaultChecked={deckSettings.colors.includes("White")}
            type="Checkbox"
            name="colors"
            value="White"
          />
          <label htmlFor="white">
            <p>White</p>
          </label>
          <input
            id="black"
            onChange={() => updateColors("Black")}
            defaultChecked={deckSettings.colors.includes("Black")}
            type="Checkbox"
            name="colors"
            value="Black"
          />
          <label htmlFor="black">
            <p>Black</p>
          </label>
          <input
            id="blue"
            onChange={() => updateColors("Blue")}
            defaultChecked={deckSettings.colors.includes("Blue")}
            type="Checkbox"
            name="colors"
            value="Blue"
          />
          <label htmlFor="blue">
            <p>Blue</p>
          </label>
          <input
            id="red"
            onChange={() => updateColors("Red")}
            defaultChecked={deckSettings.colors.includes("Red")}
            type="Checkbox"
            name="colors"
            value="Red"
          />
          <label htmlFor="red">
            <p>Red</p>
          </label>
          <input
            id="green"
            onChange={() => updateColors("Green")}
            defaultChecked={deckSettings.colors.includes("Green")}
            type="Checkbox"
            name="colors"
            value="Green"
          />
          <label htmlFor="green">
            <p>Green</p>
          </label>
        </fieldset>

        <label className={styles.question}>
          <legend>Select Creature Types</legend>
          {error && <p>Error: {error}</p>}
          {!loading && !error && (
           <Select 
            isMulti
            styles={customStyles}
            options={creatureTypeOptions}
            onChange={handleCreatureTypeChange}
            defaultValue={deckSettings.creatureTypes?.map((type) => ({
              value: type,
              label: type,
            }))}
          />
          )}
        </label>

        <label className={styles.question} htmlFor="creatureCount">
          <p>Creature Count</p>
          <input
            type="number"
            id="creatureCount"
            min="0"
            max="100"
            value={deckSettings.creatureCount || ""}
            onChange={(e) =>
              handleInputChange("creatureCount", parseInt(e.target.value) || 0)
            }
          />
        </label>

        <label className={styles.question} htmlFor="landCount">
          <p>Land Count</p>
          <input
            type="number"
            id="landCount"
            min="0"
            max="100"
            value={deckSettings.landCount || ""}
            onChange={(e) =>
              handleInputChange("landCount", parseInt(e.target.value) || 0)
            }
          />
        </label>

        <label className={styles.question} htmlFor="instantSorceryCount">
          <p>Instant/Sorcery Count</p>
          <input
            type="number"
            id="instantSorceryCount"
            min="0"
            max="100"
            value={deckSettings.instantSorceryCount || ""}
            onChange={(e) =>
              handleInputChange(
                "instantSorceryCount",
                parseInt(e.target.value) || 0
              )
            }
          />
        </label>

        <button type="submit" onClick={handleClick}>Create Deck</button>
      </form>
    </div>
  );
};

export default NewDeckForm;
