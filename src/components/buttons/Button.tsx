import Link from "next/link";
import styles from "./Button.module.scss";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  alert?: boolean;
}

export const Button = ({
  children,
  className,
  disabled,
  href,
  onClick,
  type = "button",
  variant = "primary",
  alert,
}: ButtonProps) => {
  return href ? (
    <Link
      href={href}
      className={clsx(
        styles.button,
        disabled && styles.disabled,
        variant === "secondary" && styles.secondary,
        alert && styles.alert,
        className
      )}
    >
      {children}
    </Link>
  ) : (
    <button
      className={clsx(
        styles.button,
        disabled && styles.disabled,
        variant === "secondary" && styles.secondary,
        alert && styles.alert,
        className
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
