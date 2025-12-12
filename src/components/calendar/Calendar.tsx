"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { pl } from "date-fns/locale";
import "react-day-picker/style.css";

export const Calendar = () => {
  const [selected, setSelected] = useState<Date>();

  return (
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={setSelected}
      locale={pl}
    />
  );
};
