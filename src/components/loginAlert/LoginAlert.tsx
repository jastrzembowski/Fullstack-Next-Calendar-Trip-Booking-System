import { PATHS } from "@/utils";
import styles from "./LoginAlert.module.scss";
import { Button } from "@/components";

export const LoginAlert = () => {
  return (
    <div className={styles.container}>
      <h1>Zaloguj się aby zobaczyć dostępne terminy i dokonaj rezerwacji!</h1>
      <Button href={PATHS.LOGIN} variant="secondary">Zaloguj się</Button>
      <Button href={PATHS.REGISTER} variant="secondary">Zarejestruj się</Button>
    </div>
  );
};