import {
  SkillLevel,
  Skill,
  Platform,
  type AuditoryResource,
  PaymentType,
} from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const emptyStringToUndefined = (val: string | undefined | null) => {
  if (val?.length === 0) {
    return undefined;
  }

  return val;
};

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

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        icon: z.string().min(1).optional(),
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        manufacturer: z
          .object({
            name: z.string().min(1),
            required: z.boolean(),
            notice: z
              .string()
              .optional()
              .nullable()
              .transform(emptyStringToUndefined),
          })
          .optional(),
        ages: z
          .object({ min: z.number().int(), max: z.number().int() })
          .optional(),
        skills: z.array(z.nativeEnum(Skill)).optional(),
        skill_levels: z.array(z.nativeEnum(SkillLevel)).optional(),
        payment_options: z.array(z.nativeEnum(PaymentType)).optional(),
        photo: z
          .object({
            name: z.string(),
            data: z.instanceof(Buffer),
          })
          .optional(),
        platform_links: z
          .array(
            z.object({
              platform: z.nativeEnum(Platform),
              link: z.string().min(1),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.auditoryResource.update({
        where: {
          id: input.id,
        },
        data: Object.fromEntries(
          Object.entries(input).filter(([key, _value]) => {
            return key !== "id";
          })
        ),
      });
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
        platform_links: {
          some: {
            platform: {
              in: input.platforms,
            },
          },
        },
        ...(input.skills ? { skills: { hasSome: input.skills } } : {}),
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

      // TODO: The issue here is the photo binary data can't be sent over tRPC which will cause the request to be unparsable by the client
      return {
        count,
        resources,
      };
    }),
});
