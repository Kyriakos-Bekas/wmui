import { type ProgramStage, type Program } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { slugify } from "~/utils/slugify";

const determineStage = (
  duration: number,
  durationLeft: number
): ProgramStage => {
  const percentage = durationLeft / duration;

  if (percentage === 1) {
    return "IDLE";
  } else if (percentage > 0.9) {
    // Finish takes 10% of the time
    return "FINISH";
  } else if (percentage > 0.7) {
    // Spinning takes 20% of the time
    return "SPIN";
  } else if (percentage > 0.5) {
    // Rinsing takes 20% of the time
    return "RINSE";
  } else {
    // Washing takes 50% of the time
    return "WASH";
  }
};

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

      // Generate duration that is between 30 and 120 minutes with a step of 5
      const duration = Math.floor(Math.random() * 18 + 6) * 5;

      return ctx.prisma.program.create({
        data: {
          name,
          type: "CUSTOM",
          temperature,
          spin,
          duration,
          inProgress: false,
          start: -1,
          slug: slugify(name),
          stage: "IDLE",
          durationLeft: duration,
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
  setProgress: publicProcedure
    .input(
      z.object({
        id: z.string(),
        inProgress: z.boolean(),
        durationLeft: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, inProgress, durationLeft } = input;

      const program = await ctx.prisma.program.findUnique({
        where: { id },
      });

      if (!program) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: JSON.stringify({
            en: `Program with id '${id}' does not exist`,
            gr: `Το πρόγραμμα με id '${id}' δεν υπάρχει`,
          }),
        });
      }

      return ctx.prisma.program.update({
        where: { id },
        data: {
          ...program,
          inProgress,
          stage: inProgress
            ? determineStage(program.duration, durationLeft)
            : "IDLE",
          durationLeft,
        },
      });
    }),
  start: publicProcedure
    .input(
      z.object({
        id: z.string(),
        start: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, start } = input;

      const program = await ctx.prisma.program.findUnique({
        where: { id },
      });

      if (!program) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: JSON.stringify({
            en: `Program with id '${id}' does not exist`,
            gr: `Το πρόγραμμα με id '${id}' δεν υπάρχει`,
          }),
        });
      }

      return ctx.prisma.program.update({
        where: { id },
        data: {
          ...program,
          inProgress: start === 0,
          stage: start === 0 ? "WASH" : "IDLE",
          durationLeft: program.duration,
          start,
        },
      });
    }),
  finish: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      const program = await ctx.prisma.program.findUnique({
        where: { id },
      });

      if (!program) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: JSON.stringify({
            en: `Program with id '${id}' does not exist`,
            gr: `Το πρόγραμμα με id '${id}' δεν υπάρχει`,
          }),
        });
      }

      return ctx.prisma.program.update({
        where: { id },
        data: {
          ...program,
          inProgress: false,
          stage: "IDLE",
          durationLeft: program.duration,
          start: -1,
        },
      });
    }),
  abort: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      const program = await ctx.prisma.program.findUnique({
        where: { id },
      });

      if (!program) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: JSON.stringify({
            en: `Program with id '${id}' does not exist`,
            gr: `Το πρόγραμμα με id '${id}' δεν υπάρχει`,
          }),
        });
      }

      return ctx.prisma.program.update({
        where: { id },
        data: {
          ...program,
          inProgress: false,
          stage: "IDLE",
          durationLeft: program.duration,
          start: -1,
        },
      });
    }),
});
