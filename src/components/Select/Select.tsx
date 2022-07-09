import { VisuallyHidden } from "../VisuallyHidden";
import styles from "./Select.module.css";

export const Select = () => {
  return (
    <label>
      <VisuallyHidden>Select the time unit:</VisuallyHidden>

      <select className={styles.select}>
        <option value="ms">ms</option>
        <option value="s">s</option>
      </select>
    </label>
  );
};
