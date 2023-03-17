import { z } from "zod";

import {
  createTRPCRouter, publicProcedure,
} from "~/server/api/trpc";

export const auditoryResourceRouter = createTRPCRouter({
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const resource = await ctx.prisma.auditoryResource.findUnique({
        where: {
          id: input.id,
        }
      });
      
      return { ...resource };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.auditoryResource.findMany();
  }),
});
