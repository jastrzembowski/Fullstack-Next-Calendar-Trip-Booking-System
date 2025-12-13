import styles from "./Input.module.scss";
import clsx from "clsx";

interface InputProps {
  className?: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}
export const Input = ({
  type,
  placeholder,
  value,
  onChange,
  required,
  className,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={clsx(styles.input, className)}
    />
  );
};
