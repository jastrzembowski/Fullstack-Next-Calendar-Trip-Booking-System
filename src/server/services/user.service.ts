import { UserToDB } from "@/models";
import { hashPassword } from "@/server/utils/hash";

import { db } from "../db";

export const UserService = {
  findAll: () => db.user.findMany(),
  create: (data: UserToDB) => db.user.create({ data }),

  findByEmail: (email: string) => {
    return db.user.findUnique({ where: { email } });
  },

  findById: (id: number) => {
    return db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        role: true,
      },
    });
  },

  createWithPassword: async (data: {
    email: string;
    password: string;
    name: string;
    surname: string;
    role?: string;
  }) => {
    const passwordHash = await hashPassword(data.password);
    return db.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
        surname: data.surname,
        role: data.role || "user",
      },
    });
  },
};
