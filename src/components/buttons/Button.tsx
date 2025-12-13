"use client";

import clsx from "clsx";
import Link from "next/link";

import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
      disabled={disabled}
    >
      {children}
    </button>
  );
};
