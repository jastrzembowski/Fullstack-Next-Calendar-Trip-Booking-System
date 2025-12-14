"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button, Modal, Toast } from "@/components";
import { SlotItemWithUser } from "@/models";
import { handleDeleteDate } from "@/utils";

import styles from "./EditableSlot.module.scss";

export const EditableSlot = ({ slot }: { slot: SlotItemWithUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    const data = await handleDeleteDate(slot.id);
    if (data.success) {
      Toast("Wizyta usunięta", "success");
    } else {
      Toast(data.error, "error");
    }
    handleClose();
    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <tr>
        <td>{dayjs(slot.date).format("YYYY-MM-DD")}</td>
        <td>{dayjs(slot.date).format("HH:mm")}</td>
        <td>
          <Button onClick={handleOpen}>Usuń</Button>
        </td>
      </tr>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className={styles.modalContent}>
          <h1>Czy na pewno chcesz usunąć ten termin?</h1>
          <Button onClick={handleDelete} variant="secondary">
            Usuń
          </Button>
          <Button onClick={handleClose} variant="secondary" alert>
            Anuluj
          </Button>
        </div>
      </Modal>
    </>
  );
};
