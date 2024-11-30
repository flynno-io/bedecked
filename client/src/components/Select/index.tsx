// src/components/InlineOption/index.tsx

import styles from "./Select.module.scss"

interface SelectProps {
  name: string
  selectedValue: string | string[] | number
  values: string[]
  handleChange: (value: string | string[] | number) => void
}

const Select = ({ name, selectedValue, values, handleChange}: SelectProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{name}</label>
      <select
        id={name}
        name={name}
        value={selectedValue}
        onChange={(e) => handleChange(e.target.value)}
      >
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select