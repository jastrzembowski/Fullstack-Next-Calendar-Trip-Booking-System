import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <button className={styles.closeButton} onClick={onClose}>
        x
      </button>
      {children}
    </div>
  );
};
