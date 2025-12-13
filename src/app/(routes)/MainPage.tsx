import { FormContainer, Header } from "@/components";
import styles from "./MainPage.module.scss";
import { getCurrentUser } from "@/server/auth";

  
export const MainPage = async () => {
  const user = await getCurrentUser();
  
  return (
    <div className={styles.container}>
      <Header>
        <FormContainer user={user} />
      </Header>
    </div>
  );
};