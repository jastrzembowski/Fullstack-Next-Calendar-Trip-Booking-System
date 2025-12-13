"use client";

import { pl } from "date-fns/locale";
import { Dispatch, SetStateAction } from "react";
import { DayPicker } from "react-day-picker";

import "react-day-picker/style.css";

interface CalendarProps {
  selectedDate?: Date;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
}
export const Calendar = ({ selectedDate, setSelectedDate }: CalendarProps) => {
  const matcher = [
    { dayOfWeek: [0, 7] },
    { from: new Date(1900, 0, 1), to: new Date() },
  ];

  return (
    <DayPicker
      animate
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
      locale={pl}
      disabled={matcher}
    />
  );
};
