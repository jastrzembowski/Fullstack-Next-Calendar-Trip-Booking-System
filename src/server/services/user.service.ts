import { db } from "../db";
import { hashPassword } from "../utils/hash";

export const UserService = {
  findAll: () => db.user.findMany(),
  create: (data: { name?: string; email: string }) => db.user.create({ data }),
  
  findByEmail: (email: string) => {
    return db.user.findUnique({ where: { email } });
  },

  createWithPassword: async (data: { email: string; password: string }) => {
    const passwordHash = await hashPassword(data.password);
    return db.user.create({
      data: {
        email: data.email,
        passwordHash,
      },
    });
  },
};
