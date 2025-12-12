import styles from "./Header.module.scss";
import headerImage from "@/assets/header.webp";

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