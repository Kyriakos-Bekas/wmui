import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const programRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        type: z.enum(["CUSTOM", "DEFAULT"]).optional(),
      })
    )
    .query(({ ctx, input }) => {
      const { type } = input;

      if (type) {
        return ctx.prisma.program.findMany({
          where: {
            type,
          },
        });
      }

      return ctx.prisma.program.findMany();
    }),
});
