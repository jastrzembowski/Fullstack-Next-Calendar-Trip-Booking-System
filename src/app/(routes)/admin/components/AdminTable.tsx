"use client";

import { SlotItemWithUser } from "@/models";

import { AdminRow } from "./AdminRow";
import styles from "./AdminTable.module.scss";

export const AdminTable = ({
  dates,
}: {
  dates: SlotItemWithUser[];
}) => {
  if (!dates || dates.length === 0) {
    return <div>Brak terminów</div>;
  }

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.th}>ID</th>
          <th className={styles.th}>Data</th>
          <th className={styles.th}>Godzina</th>
          <th className={styles.th}>Użytkownik</th>
          <th className={styles.th}>Email</th>
          <th className={styles.th}>Akcje</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {dates.map((date) => (
          <AdminRow key={date.id} date={date} />
        ))}
      </tbody>
    </table>
  );
};
