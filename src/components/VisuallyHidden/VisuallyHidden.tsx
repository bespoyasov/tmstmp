import type { PropsWithChildren } from "react";
import styles from "./VisuallyHidden.module.css";

export const VisuallyHidden = ({ children }: PropsWithChildren) => {
  return <span className={styles.container}>{children}</span>;
};
