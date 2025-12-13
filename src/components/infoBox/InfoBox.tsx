import styles from "./InfoBox.module.scss";
import clsx from "clsx";

interface InfoBoxProps {
  children: React.ReactNode;
  className?: string;
}

export const InfoBox = ({ children, className }: InfoBoxProps) => {
  return (
    <div className={clsx(styles.container, className)}>
        {children}
    </div>
  );
};