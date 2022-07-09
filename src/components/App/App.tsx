import { Form } from "../Form";
import { Footer } from "../Footer";
import styles from "./App.module.css";

export const App = () => {
  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <Form />
      </main>

      <Footer />
    </div>
  );
};
