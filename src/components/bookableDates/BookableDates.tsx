import dayjs from "dayjs";

import { generateTimeSlots } from "@/utils/generateSlots";

import { DateBlock } from "../dateBlock/DateBlock";
import { InfoBox } from "../infoBox";
import styles from "./BookableDates.module.scss";

interface BookableDatesProps {
  selectedDate?: Date;
  dates: string[];
  fetchDates: () => void;
}
export const BookableDates = ({
  selectedDate,
  dates,
  fetchDates,
}: BookableDatesProps) => {
  const datesToDisplay = generateTimeSlots("09:00", "17:00").filter(
    (time: string) => {
      return !dates.includes(time);
    }
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Dostępne terminy {dayjs(selectedDate).format("DD.MM.YYYY")}
      </h2>
      {selectedDate ? (
        datesToDisplay.length > 0 ? (
          <>
            {datesToDisplay.map((time: string) => (
              <DateBlock
                date={selectedDate}
                time={time}
                fetchDates={fetchDates}
                key={time}
              />
            ))}
          </>
        ) : (
          <InfoBox className={styles.infoBox}>
            <h2 className={styles.infoTitle}>Brak dostępnych terminów</h2>
            <p className={styles.infoText}>
              Nie ma dostępnych terminów dla wybranej daty
            </p>
          </InfoBox>
        )
      ) : (
        <InfoBox className={styles.infoBox}>
          <h2 className={styles.infoTitle}>Rozpocznij wyszukiwanie!</h2>
          <p className={styles.infoText}>
            Wybierz datę z kalendarza <br />i sprawdź dostępne terminy
          </p>
        </InfoBox>
      )}
    </div>
  );
};
