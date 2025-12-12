import Link from "next/link";
import styles from "./Button.module.scss";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
   href?: string;
   type?: "button" | "submit" | "reset";
   disabled?: boolean;
   onClick?: () => void;
   variant?: "primary" | "secondary";
}

export const Button = ({
  children,
  type = "button",
  href,
  disabled,
  onClick,
  variant = "primary",
}: ButtonProps) => {
  return href ? (
    <Link href={href} className={clsx(styles.button, disabled && styles.disabled, variant === "secondary" && styles.secondary)}>
      {children}
    </Link>
  ) : (
    <button className={clsx(styles.button, disabled && styles.disabled, variant === "secondary" && styles.secondary)} type={type} onClick={onClick}>{children}</button>
  );
};
