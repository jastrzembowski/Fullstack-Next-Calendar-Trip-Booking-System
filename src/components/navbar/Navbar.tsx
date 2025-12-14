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

  const isAdmin = user?.role === "admin";

  return (
    <nav className={styles.navbar}>
      <Logo />
      <div className={styles.links}>
        {user ? (
          <div className={styles.userLinks}>
            <p className={styles.welcome}>
              Witaj, {user.name} {user.surname}!
            </p>
            {isAdmin ? (
              <Button href={PATHS.ADMIN}>Panel administracyjny</Button>
            ) : (
              <>
                <Button href={PATHS.HOME}>Strona główna</Button>
                <Button href={PATHS.PROFILE}>Profil</Button>
              </>
            )}

            <Button onClick={logout} className={styles.logoutButton}>
              Wyloguj
            </Button>
          </div>
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
