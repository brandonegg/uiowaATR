import { createTRPCRouter } from "~/server/api/trpc";
import { auditoryResourceRouter } from "~/server/api/routers/auditoryResources";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auditoryResource: auditoryResourceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
