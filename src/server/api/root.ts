import { createTRPCRouter } from "~/server/api/trpc";
import { programRouter } from "./routers/program";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  program: programRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
