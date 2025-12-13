"use client";

import dayjs from "dayjs";
import { useState } from "react";

import { Button, Modal, Toast } from "@/components";
import { SlotItemWithUser } from "@/models";
import { adminDeleteSlot } from "@/utils";

import styles from "./AdminRow.module.scss";
import { useRouter } from "next/navigation";

export const AdminRow = ({ date }: { date: SlotItemWithUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const data = await adminDeleteSlot(id);
    if (data.success) {
      Toast("Wizyta usunięta", "success");
    } else {
      Toast(data.error, "error");
    }
    handleClose();
    router.refresh();
  };

  return (
    <>
      <tr className={styles.tr}>
        <td className={styles.td}>{date.id}</td>
        <td className={styles.td}>{dayjs(date.date).format("YYYY-MM-DD")}</td>
        <td className={styles.td}>{dayjs(date.date).format("HH:mm")}</td>
        <td className={styles.td}>
          {date.user?.name} {date.user?.surname}
        </td>
        <td className={styles.td}>{date.user?.email}</td>
        <td className={styles.td}>
          <Button onClick={handleOpen}>Usuń wizytę</Button>
        </td>
      </tr>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.modalContent}>
          <h1>Czy na pewno chcesz usunąć tę wizytę?</h1>
          <Button variant="secondary" onClick={() => handleDelete(date.id)}>
            Usuń wizytę
          </Button>
          <Button variant="secondary" alert onClick={handleClose}>
            Anuluj
          </Button>
        </div>
      </Modal>
    </>
  );
};
