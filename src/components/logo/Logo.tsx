import clsx from "clsx";
import Link from "next/link";

import LogoImg from "@/assets/logo.svg";

import styles from "./Logo.module.scss";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={clsx(styles.logoLink, className)}>
      <LogoImg className={styles.logo} />
      Getaboat.pl
    </Link>
  );
};
