import { VisuallyHidden } from "../VisuallyHidden";
import { updateUnit, useConverter } from "../../application";
import { options } from "./options";
import styles from "./Select.module.css";

export const Select = () => {
  const { unit } = useConverter();

  return (
    <label>
      <VisuallyHidden>Select the time unit:</VisuallyHidden>

      <select className={styles.select} value={unit} onChange={updateUnit}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
};
