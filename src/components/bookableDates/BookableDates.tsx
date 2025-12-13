import { generateTimeSlots } from "@/utils/generateSlots";
import { DateBlock } from "../dateBlock/DateBlock";
import { InfoBox } from "../infoBox";

import styles from "./BookableDates.module.scss";
import { User } from "@/models";

interface BookableDatesProps {
  selectedDate?: Date;
  user: User | null;
}
export const BookableDates = ({ selectedDate, user }: BookableDatesProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dostępne terminy {selectedDate?.toLocaleDateString()}</h2>
      {selectedDate ? (
        generateTimeSlots("09:00", "17:00").map((time: string) => (
          <DateBlock key={time} date={selectedDate} time={time} user={user} />
        ))
      ) : (
        <InfoBox className={styles.infoBox}>
          <h2 className={styles.infoTitle}>Rozpocznij wyszukiwanie!</h2>
          <p className={styles.infoText}>Wybierz datę z kalendarza <br/>i sprawdź dostępne terminy</p>
        </InfoBox>
      )}
    </div>
  );
};
