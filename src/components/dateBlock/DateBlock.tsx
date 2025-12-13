"use client";

import { Button, Modal, User } from "@/components";
import styles from "./DateBlock.module.scss";
import { Fragment, useState } from "react";

interface DateBlockProps {
  date: Date;
  key?: string;
  time: string;
  user: User | null;
}

export const DateBlock = ({ date, key, time, user }: DateBlockProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);



  return (
    <Fragment key={key}>  
      <button className={styles.container} onClick={handleOpen}>
        <span className={styles.content}>{date.toLocaleDateString()} {time}</span>
        <span className={styles.hiddenText}>Zarezerwuj</span>
      </button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className={styles.modalContent}>
        <h1>Czy na pewno chcesz zarezerwować ten termin?</h1>
        <div className={styles.details}>
        <p>email: {user?.email}</p>
        <p>Data: {date.toLocaleDateString()}</p>
        <p>Godzina: {time}</p>
        </div>
        <Button variant="secondary" className={styles.confirmButton} onClick={handleClose}>Zarezerwuj</Button>
        <Button variant="secondary" alert className={styles.cancelButton} onClick={handleClose}>Anuluj</Button>
        </div>
      </Modal>
      </Fragment>
  );
};
