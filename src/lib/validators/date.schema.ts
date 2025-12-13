import { z } from "zod";

export const dateSchema = z.object({
  date: z.union([
    z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    z.date(),
  ]),
  title: z.string().optional(),
  notes: z.string().optional(),
});
