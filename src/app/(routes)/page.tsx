import { FormContainer, Header } from "@/components";

import styles from "./MainPage.module.scss";

export default async function MainPage() {
  return (
    <div className={styles.container}>
      <Header>
        <FormContainer />
      </Header>
    </div>
  );
}
