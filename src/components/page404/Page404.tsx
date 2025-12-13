import { PATHS } from "@/utils";

import { Button } from "../buttons";
import styles from "./Page404.module.scss";

export const Page404 = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Nie znaleziono strony</h1>
      <p>Strona, której szukasz, nie istnieje.</p>
      <Button href={PATHS.HOME} variant="secondary">
        Wróć do strony głównej
      </Button>
    </div>
  );
};
