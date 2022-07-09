import { VisuallyHidden } from "../VisuallyHidden";
import { options } from "./options";
import styles from "./Select.module.css";

export const Select = () => {
  return (
    <label>
      <VisuallyHidden>Select the time unit:</VisuallyHidden>

      <select className={styles.select}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
};
