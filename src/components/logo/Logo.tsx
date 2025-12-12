import Link from "next/link";
import LogoImg from "@/assets/logo.svg";
import styles from "./Logo.module.scss";

export const Logo = () => {
  return (
    <Link href="/" className={styles.logoLink}>
      <LogoImg className={styles.logo} />

      Getaboat.pl
    </Link>
  );
};
