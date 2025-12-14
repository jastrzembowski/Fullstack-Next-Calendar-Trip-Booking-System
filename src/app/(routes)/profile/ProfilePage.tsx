"use client";

import { useEffect, useState } from "react";

import { Button, InfoBox, Toast, useUser } from "@/components";
import { SlotItemWithUser } from "@/models";
import { handleFetchSlots, PATHS } from "@/utils";

import {
  EditableField,
  EditableSlot,
  FieldType,
  ProfileBox,
} from "./components";
import styles from "./ProfilePage.module.scss";

export const ProfilePage = () => {
  const [dates, setDates] = useState<SlotItemWithUser[]>([]);

  const user = useUser();

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const data = await handleFetchSlots(null, user.user?.id);
        if (data?.success) {
          setDates(data.dates);
        }
      } catch (error) {
        console.error(error);
        Toast(String(error), "error");
      }
    };
    fetchDates();
  }, [user]);

  return (
    <div className={styles.wrapper}>
      <ProfileBox>
        <h1 className={styles.title}>
          Profil użytkownika {user.user?.name} {user.user?.surname}
        </h1>
        <EditableField value={user.user?.email || ""} type={FieldType.EMAIL} />
        <EditableField value={user.user?.name || ""} type={FieldType.NAME} />
        <EditableField
          value={user.user?.surname || ""}
          type={FieldType.SURNAME}
        />
      </ProfileBox>
      <ProfileBox>
        <h1 className={styles.title}>Rezerwacje użytkownika </h1>
        {dates && dates.length > 0 ? (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Godzina</th>
                  <th>Usuń</th>
                </tr>
              </thead>
              <tbody>
                {dates.map((date) => (
                  <EditableSlot key={date.id} slot={date} />
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <InfoBox>
            <h2 className={styles.infoTitle}>Brak rezerwacji</h2>
            <Button href={PATHS.HOME} variant="secondary">
              Zarezerwuj rejs
            </Button>
          </InfoBox>
        )}
      </ProfileBox>
    </div>
  );
};
