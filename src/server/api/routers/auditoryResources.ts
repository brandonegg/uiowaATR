import {
  SkillLevel,
  Skill,
  Platform,
  type AuditoryResource,
} from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const auditoryResourceRouter = createTRPCRouter({
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const resource = await ctx.prisma.auditoryResource.findUnique({
        where: {
          id: input.id,
        },
      });

      return { ...resource } as AuditoryResource;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.auditoryResource.findMany();
  }),

  search: publicProcedure
    .input(
      z.object({
        take: z.number().int(),
        skip: z.number().int(),
        ages: z
          .object({
            min: z.number().int(),
            max: z.number().int(),
          })
          .optional(),
        platforms: z.nativeEnum(Platform).array().optional(),
        skill_levels: z.nativeEnum(SkillLevel).array().optional(),
        skills: z.nativeEnum(Skill).array().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const search = {
        ages: {
          is: {
            min: {
              lte: input.ages?.min,
            },
            max: {
              gte: input.ages?.max,
            },
          },
        },
        skill_levels: {
          hasEvery: input.skill_levels ?? [],
        },
        skills: {
          hasSome: input.skills ?? [],
        },
        platform_links: {
          some: {
            platform: {
              in: input.platforms,
            },
          },
        },
      };

      const [count, resources] = await ctx.prisma.$transaction([
        ctx.prisma.auditoryResource.count({
          where: search,
        }),
        ctx.prisma.auditoryResource.findMany({
          skip: input.skip,
          take: input.take,
          where: search,
        }),
      ]);

      return {
        count,
        resources,
      };
    }),
});
