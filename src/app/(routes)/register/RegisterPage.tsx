import { LoginBox } from "@/components";

import styles from "./RegisterPage.module.scss";

export const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <LoginBox type="register" />
    </div>
  );
};
