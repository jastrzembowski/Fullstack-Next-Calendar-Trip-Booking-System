"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useCallback, useEffect, useState } from "react";

import {
  BookableDates,
  Calendar,
  Loader,
  LoginAlert,
  useUser,
} from "@/components";
import { SlotItem } from "@/models";
import { handleFetchSlots } from "@/utils";

import styles from "./form.module.scss";

dayjs.extend(utc);

export const FormContainer = () => {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [dates, setDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDates = useCallback(async () => {
    setIsLoading(true);
    const data = await handleFetchSlots(selectedDate);
    if (data?.success) {
      const slots = data.dates.map((item: SlotItem) =>
        dayjs.utc(item.date).format("HH:mm")
      );
      setDates(slots);
    }
    setIsLoading(false);
  }, [selectedDate]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchDates();
  }, [fetchDates]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}> Zarezerwuj prywatny rejs </h2>
      <div className={styles.calendarContainer}>
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        {user ? (
          isLoading ? (
            <Loader />
          ) : (
            <BookableDates
              selectedDate={selectedDate}
              dates={dates}
              fetchDates={fetchDates}
            />
          )
        ) : (
          <LoginAlert />
        )}
      </div>
    </div>
  );
};
