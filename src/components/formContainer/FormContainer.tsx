"use client";

import { Calendar, LoginAlert } from "@/components";
import styles from "./form.module.scss";
import { useState } from "react";
import { BookableDates } from "../bookableDates/BookableDates";
import { User } from "@/models";

interface FormContainerProps {
  user: User | null;
}
export const FormContainer = ({ user }: FormContainerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}> Zarezerwuj prywatny rejs  </h2>
      <div className={styles.calendarContainer}>
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        {user ? (
          <BookableDates selectedDate={selectedDate} user={user} />
        ) : (
          <LoginAlert />
        )}
      </div>
    </div>
  );
};
