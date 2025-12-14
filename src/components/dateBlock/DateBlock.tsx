"use client";

import dayjs from "dayjs";
import { Fragment, useState } from "react";

import { Toast, useUser } from "@/components";
import { handleCreateDate } from "@/utils";

import { AdminModal } from "./components/AdminModal";
import { UserModal } from "./components/UserModal";
import styles from "./DateBlock.module.scss";

interface DateBlockProps {
  date: Date;
  time: string;
  fetchDates: () => void;
}

export const DateBlock = ({ date, time, fetchDates }: DateBlockProps) => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const isAdmin = user?.role === "admin";

  const handleRegister = async () => {
    const data = await handleCreateDate(
      `${dayjs(date).format("YYYY-MM-DD")} ${time}`
    );
    console.log(data);
    if (data?.success) {
      handleClose();
      fetchDates();
      Toast("Termin zarezerwowany", "info");
    } else {
      console.error(data?.error);
      handleClose();
      Toast(data?.error, "error");
    }
  };

  return (
    <Fragment>
      <button className={styles.container} onClick={handleOpen}>
        <span className={styles.content}>
          {date.toLocaleDateString()} {time}
        </span>
        <span className={styles.hiddenText}>Zarezerwuj</span>
      </button>
      {isAdmin ? (
        <AdminModal
          isOpen={isOpen}
          handleClose={handleClose}
          handleRegister={handleRegister}
          date={date}
          time={time}
        />
      ) : (
        <UserModal
          isOpen={isOpen}
          handleClose={handleClose}
          handleRegister={handleRegister}
          date={date}
          time={time}
        />
      )}
    </Fragment>
  );
};
