import { db } from "../db";

export const DateService = {
  findAll: () => db.date.findMany(),
  findById: (id: string) => db.date.findUnique({ where: { id } }),
  findByUserId: (userId: number) => db.date.findMany({ where: { userId } }),
  create: (data: {
    date: Date;
    title?: string;
    notes?: string;
    userId?: number;
  }) => db.date.create({ data }),
  update: (id: string, data: {
    date?: Date;
    title?: string;
    notes?: string;
  }) => db.date.update({ where: { id }, data }),
  delete: (id: string) => db.date.delete({ where: { id } }),
};

