"use client";

import { PATHS } from "@/utils";
import styles from "./Navbar.module.scss";
import { Logo, Button } from "@/components";


interface NavbarProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}
export const Navbar =  ( { isLoggedIn, handleLogout }: NavbarProps ) => {


  return (
    <nav className={styles.navbar}>
      <Logo />
      <div className={styles.links}>
        {isLoggedIn ? (
          <Button onClick={() => handleLogout()}>Logout</Button>
        ) : (
          <>
            <Button href={PATHS.LOGIN}>Login</Button>
            <Button href={PATHS.REGISTER}>Register</Button>
          </>
        )}
      </div>
    </nav>
  );
};
