import { SlotItemWithUser } from "@/models";

import styles from "./AdminPage.module.scss";
import { AdminTable } from "./components";

export const AdminPage = ({ dates }: { dates: SlotItemWithUser[] }) => {
  return (
    <div className={styles.container}>
      <h1>Witaj Admin!</h1>
      <AdminTable dates={dates} />
    </div>
  );
};
