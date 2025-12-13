import { FormContainer, Header } from "@/components";

import styles from "./MainPage.module.scss";

export const MainPage = async () => {
  return (
    <div className={styles.container}>
      <Header>
        <FormContainer />
      </Header>
    </div>
  );
};
