import clsx from "clsx";

import styles from "./Input.module.scss";

interface InputProps {
  className?: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required: boolean;
  error?: string;
}
export const Input = ({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  required,
  className,
  error,
}: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        className={clsx(styles.input, error && styles.inputError, className)}
      />
      {error ? (
        <span className={styles.error}>{error}</span>
      ) : (
        <span className={styles.placeholder}></span>
      )}
    </div>
  );
};
