import { HTMLProps } from "react";
import { VisuallyHidden } from "../VisuallyHidden";
import styles from "./Input.module.css";

type InputProps = {
  label: string;
};

export const Input = ({
  label,
  ...props
}: InputProps & HTMLProps<HTMLInputElement>) => {
  return (
    <label className={styles.input}>
      <VisuallyHidden>{label}</VisuallyHidden>
      <input className={styles.control} {...props} />
    </label>
  );
};
