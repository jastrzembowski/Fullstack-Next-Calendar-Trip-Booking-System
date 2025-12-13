"use client";

import dayjs from "dayjs";
import { Fragment, useState } from "react";

import { Button, Modal, Toast, useUser } from "@/components";
import { handleCreateDate } from "@/utils";

import styles from "./DateBlock.module.scss";

interface DateBlockProps {
  date: Date;
  time: string;
  fetchDates: () => void;
}

export const DateBlock = ({ date, time, fetchDates }: DateBlockProps) => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleRegister = async () => {
    const data = await handleCreateDate(
      `${dayjs(date).format("YYYY-MM-DD")} ${time}`
    );
    console.log(data);
    if (data?.success) {
      handleClose();
      fetchDates();
      Toast("Termin zarezerwowany", "info");
    } else {
      console.error(data?.error);
      handleClose();
      Toast(data?.error, "error");
    }
  };

  return (
    <Fragment>
      <button className={styles.container} onClick={handleOpen}>
        <span className={styles.content}>
          {date.toLocaleDateString()} {time}
        </span>
        <span className={styles.hiddenText}>Zarezerwuj</span>
      </button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className={styles.modalContent}>
          <h1>Czy na pewno chcesz zarezerwować ten termin?</h1>
          <div className={styles.details}>
            <p>Imię: {user?.name}</p>
            <p>Nazwisko: {user?.surname}</p>
            <p>email: {user?.email}</p>
            <p>Data: {date.toLocaleDateString()}</p>
            <p>Godzina: {time}</p>
          </div>
          <Button
            variant="secondary"
            className={styles.confirmButton}
            onClick={handleRegister}
          >
            Zarezerwuj
          </Button>
          <Button
            variant="secondary"
            alert
            className={styles.cancelButton}
            onClick={handleClose}
          >
            Anuluj
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};
