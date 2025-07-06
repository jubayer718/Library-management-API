import { z } from "zod";

export const borrowValidation = z.object({
  book: z.string(),
  quantity: z.number().min(1, "Minimum 1 copy must be borrowed"),
  dueDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
});