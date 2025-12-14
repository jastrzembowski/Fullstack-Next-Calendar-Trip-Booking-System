import { Button, Modal, useUser } from "@/components";

import styles from "./Modal.module.scss";

interface UserModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleRegister: () => void;
  date: Date;
  time: string;
}

export const UserModal = ({
  isOpen,
  handleClose,
  handleRegister,
  date,
  time,
}: UserModalProps) => {
  const { user } = useUser();

  return (
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
  );
};
