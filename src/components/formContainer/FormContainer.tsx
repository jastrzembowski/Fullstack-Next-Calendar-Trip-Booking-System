"use client";

import { Calendar, LoginAlert } from "@/components";
import styles from "./form.module.scss";

interface FormContainerProps {
  isLoggedIn: boolean;
}
export const FormContainer = ({ isLoggedIn }: FormContainerProps) => {
  return (
    <div className={styles.container}>
      <Calendar />
      {isLoggedIn ? <>tu beda terminy</> : <LoginAlert />}
    </div>
  );
};
