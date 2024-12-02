import { useState, useEffect } from "react";
import Select from 'react-select';
import styles from "./NewDeckForm.module.scss";

interface OptionType {
  value: string;
  label: string;
}

interface NewDeckFormProps {
  deckSettings: {
    deckName: string;
    format: string;
    colors: string[];
    creatureTypes?: string[];
    creaturePercent?: number;
    landPercent?: number;
    instantSorceryPercent?: number;
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

  const handleCreatureTypeChange = (selectedOptions: OptionType[] | null) => {
    const selectedTypes = selectedOptions?.map((option) => option.value) || [];
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

        <div className={styles.question}>
          <legend>Select Creature Types</legend>
          {loading && <p>Loading creature types...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && (
            <Select
              isMulti
              options={creatureTypeOptions}
              onChange={handleCreatureTypeChange}
              value={creatureTypeOptions.filter((option) =>
                deckSettings.creatureTypes?.includes(option.value)
              )}
              className={styles.select}
              placeholder="Creature Types"
            />
          )}
        </div>

        <label className={styles.question} htmlFor="creaturePercent">
          <p>Creature Percentage</p>
          <input
            type="number"
            id="creaturePercent"
            min="0"
            max="100"
            value={deckSettings.creaturePercent || ""}
            onChange={(e) =>
              handleInputChange("creaturePercent", parseInt(e.target.value) || 0)
            }
          />
        </label>

        <label className={styles.question} htmlFor="landPercent">
          <p>Land Percentage</p>
          <input
            type="number"
            id="landPercent"
            min="0"
            max="100"
            value={deckSettings.landPercent || ""}
            onChange={(e) =>
              handleInputChange("landPercent", parseInt(e.target.value) || 0)
            }
          />
        </label>

        <label className={styles.question} htmlFor="instantSorceryPercent">
          <p>Instant/Sorcery Percentage</p>
          <input
            type="number"
            id="instantSorceryPercent"
            min="0"
            max="100"
            value={deckSettings.instantSorceryPercent || ""}
            onChange={(e) =>
              handleInputChange(
                "instantSorceryPercent",
                parseInt(e.target.value) || 0
              )
            }
          />
        </label>

        <button type="submit">Create Deck</button>
      </form>
    </div>
  );
};

export default NewDeckForm;
