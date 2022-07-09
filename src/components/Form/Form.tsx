import type { FormEvent } from "react";
import {
  useUiRepresentation,
  updateDate,
  updateStamp,
} from "../../application";

import { Input } from "../Input";
import { Select } from "../Select";
import styles from "./Form.module.css";

const ignore = (e: FormEvent) => {
  e.preventDefault();
};

export const Form = () => {
  const { stamp, date } = useUiRepresentation();

  return (
    <form className={styles.form} onSubmit={ignore}>
      <Input
        label="Date"
        name="date"
        type="date"
        value={date}
        onChange={updateDate}
      />
      <Input
        label="Time Stamp"
        name="timestamp"
        type="number"
        value={stamp}
        onChange={updateStamp}
      />

      <div className={styles.select}>
        <Select />
      </div>
    </form>
  );
};
