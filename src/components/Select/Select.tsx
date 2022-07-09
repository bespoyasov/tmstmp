import styles from "./Select.module.css";

export const Select = () => {
  return (
    <select className={styles.select}>
      <option>ms</option>
      <option>s</option>
    </select>
  );
};
