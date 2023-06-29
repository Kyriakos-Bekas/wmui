import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { slugify } from "~/utils/slugify";

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
  createCustom: publicProcedure
    .input(
      z.object({
        name: z.string(),
        temperature: z.number(),
        spin: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { name, temperature, spin } = input;

      return ctx.prisma.program.create({
        data: {
          name,
          type: "CUSTOM",
          temperature,
          spin,
          duration: Math.floor(Math.random() * 90 + 30),
          inProgress: false,
          start: "",
          slug: slugify(name),
        },
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id } = input;

      return ctx.prisma.program.delete({
        where: {
          id,
        },
      });
    }),
});
