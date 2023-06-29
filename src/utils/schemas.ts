import * as z from "zod";

export const saveAsFavoriteNameformSchema = {
  en: z.object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters long",
      })
      .max(50, {
        message: "Name must be at most 50 characters long",
      }),
  }),
  gr: z.object({
    name: z
      .string()
      .min(2, {
        message: "Το όνομα πρέπει να είναι τουλάχιστον 2 χαρακτήρες",
      })
      .max(50, {
        message: "Το όνομα πρέπει να είναι το πολύ 50 χαρακτήρες",
      }),
  }),
};
