import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { db } from "../db";

dayjs.extend(utc);

export const DateService = {
  findAll: () => db.date.findMany(),
  findAllWithUser: () => db.date.findMany({ include: { user: true } }),
  findById: (id: string) => db.date.findUnique({ where: { id } }),
  findByUserId: (userId: number) => db.date.findMany({ where: { userId } }),
  findByDate: (date: string) => {
    const startOfDay = dayjs.utc(date).startOf("day").toDate();
    const endOfDay = dayjs.utc(date).endOf("day").toDate();

    return db.date.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  },
  create: (data: { date: string; title?: string; userId?: number }) => {
    const utcDate = dayjs.utc(data.date).toDate();
    return db.date.create({
      data: {
        ...data,
        date: utcDate,
      },
    });
  },
  update: (
    id: string,
    data: {
      date?: string;
      title?: string;
    }
  ) => {
    const updateData: { date?: Date; title?: string } = {};

    if (data.date) {
      updateData.date = dayjs.utc(data.date).toDate();
    }

    if (data.title !== undefined) {
      updateData.title = data.title;
    }

    return db.date.update({ where: { id }, data: updateData });
  },
  delete: (id: string) => db.date.delete({ where: { id } }),
};
