import { SkillLevel, Skill, Platform } from "@prisma/client";
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

  search: publicProcedure
    .input(z.object({
      ages: z.object({
        min: z.number().int(),
        max: z.number().int(),
      }).optional(),
      platforms: z.nativeEnum(Platform).array().optional(),
      skill_levels: z.nativeEnum(SkillLevel).array().optional(),
      skills: z.nativeEnum(Skill).array().optional(),
    }))
    .query(({ input, ctx}) => {

      return ctx.prisma.auditoryResource.findMany({
        where: {
          // ages: input.ages ? {min: 0, max: 100}, TODO: Make this so ranges work.
          skill_levels: {
            hasEvery: input.skill_levels ?? Object.values(SkillLevel),
          },
          skills: {
            hasEvery: input.skills ?? Object.values(Skill),
          }
        }
      })
    }),
});
