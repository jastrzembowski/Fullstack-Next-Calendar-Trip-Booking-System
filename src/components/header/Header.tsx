import headerImage from "@/assets/header.webp";

import styles from "./Header.module.scss";

interface HeaderProps {
  children: React.ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <header
      className={styles.header}
      style={{ backgroundImage: `url(${headerImage.src || headerImage})` }}
    >
      {children}
    </header>
  );
};
