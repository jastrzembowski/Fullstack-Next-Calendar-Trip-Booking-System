"use client";

import { Button, Logo, Toast } from "@/components";
import { PATHS } from "@/utils";

import styles from "./Navbar.module.scss";

interface NavbarProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}
export const Navbar = ({ isLoggedIn, handleLogout }: NavbarProps) => {
  const logout = () => {
    handleLogout();
    Toast("Pomyślnie wylogowano", "success");
  };

  return (
    <nav className={styles.navbar}>
      <Logo />
      <div className={styles.links}>
        {isLoggedIn ? (
          <Button onClick={logout}>Wyloguj</Button>
        ) : (
          <>
            <Button href={PATHS.LOGIN}>Logowanie</Button>
            <Button href={PATHS.REGISTER}>Rejestracja</Button>
          </>
        )}
      </div>
    </nav>
  );
};
