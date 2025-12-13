"use client";

import { Button, Logo, Toast } from "@/components";
import { User } from "@/models";
import { PATHS } from "@/utils";

import styles from "./Navbar.module.scss";

interface NavbarProps {
  user: User | null;
  handleLogout: () => void;
}
export const Navbar = ({ user, handleLogout }: NavbarProps) => {
  const logout = () => {
    handleLogout();
    Toast("Pomyślnie wylogowano", "success");
  };

  return (
    <nav className={styles.navbar}>
      <Logo />
      <div className={styles.links}>
        {user ? (
          <>
            <p className={styles.welcome}>
              Witaj, {user.name} {user.surname}!
            </p>
            <Button onClick={logout}>Wyloguj</Button>
          </>
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
