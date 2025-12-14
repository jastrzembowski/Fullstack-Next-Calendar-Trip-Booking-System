import styles from "./ProfileBox.module.scss";

interface ProfileBoxProps {
  children: React.ReactNode;
}
export const ProfileBox = ({ children }: ProfileBoxProps) => {
  return <div className={styles.container}>{children}</div>;
};
