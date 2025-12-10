import { db } from "../db";

export const UserService = {
  findAll: () => db.user.findMany(),
  create: (data: { name?: string; email: string }) => db.user.create({ data }),
};
