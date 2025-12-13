import clsx from "clsx";

import styles from "./InfoBox.module.scss";

interface InfoBoxProps {
  children: React.ReactNode;
  className?: string;
}

export const InfoBox = ({ children, className }: InfoBoxProps) => {
  return <div className={clsx(styles.container, className)}>{children}</div>;
};
