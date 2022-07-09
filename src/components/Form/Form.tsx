import type { FormEvent } from "react";

import { Input } from "../Input";
import { Select } from "../Select";
import styles from "./Form.module.css";

const ignore = (e: FormEvent) => {
  e.preventDefault();
};

export const Form = () => {
  return (
    <form className={styles.form} onSubmit={ignore}>
      <Input label="Date" name="date" type="date" />
      <Input label="Time Stamp" name="timestamp" type="number" />

      <div className={styles.select}>
        <Select />
      </div>
    </form>
  );
};
