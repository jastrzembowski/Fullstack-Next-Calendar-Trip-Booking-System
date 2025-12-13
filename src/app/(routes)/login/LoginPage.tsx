import { LoginBox } from "@/components";
import styles from "./LoginPage.module.scss";

export const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginBox error={""} isLoading={false} type="login" />
    </div>
  );
}