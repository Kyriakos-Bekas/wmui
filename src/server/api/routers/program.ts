import { type Program } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { slugify } from "~/utils/slugify";

const checkIfNameExists = (
  name: string,
  programWithMatchingName: Program | null,
  id?: string
) => {
  if (!!programWithMatchingName && programWithMatchingName?.id !== id) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: JSON.stringify({
        en: `A program with the name '${name}' already exists. Please choose another name and try again`,
        gr: `Υπάρχει ήδη πρόγραμμα με το όνομα '${name}'. Παρακαλούμε επιλέξτε ένα άλλο όνομα και προσπαθήστε ξανά`,
      }),
    });
  }
};

export const programRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const { id } = input;

      return ctx.prisma.program.findUnique({
        where: {
          id,
        },
      });
    }),
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
    .mutation(async ({ ctx, input }) => {
      const { name, temperature, spin } = input;

      const nameExists = await ctx.prisma.program.findFirst({
        where: {
          name,
        },
      });

      checkIfNameExists(name, nameExists);

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
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        temperature: z.number(),
        spin: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, temperature, spin } = input;

      const program = await ctx.prisma.program.findUnique({
        where: {
          id,
        },
      });

      if (!program) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: JSON.stringify({
            en: `Program with id '${id}' does not exist`,
            gr: `Το πρόγραμμα με id '${id}' δεν υπάρχει`,
          }),
        });
      }

      const nameExists = await ctx.prisma.program.findFirst({
        where: {
          name,
        },
      });

      checkIfNameExists(name, nameExists, id);

      return ctx.prisma.program.update({
        where: {
          id,
        },
        data: {
          name,
          temperature,
          spin,
          slug: slugify(name),
        },
      });
    }),
});
