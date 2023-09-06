import { SkillLevel, Skill, Platform, PaymentType } from "@prisma/client";
import { TRPCError } from "@trpc/server";
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

const AuditoryResourceSchema = z.object({
  icon: z.string().min(1).optional().nullable(),
  name: z.string().min(1),
  description: z.string().min(1),
  manufacturer: z.object({
    name: z.string().min(1),
    required: z.boolean().default(false),
    notice: z.string().nullable().transform(emptyStringToUndefined),
  }),
  ages: z.object({ min: z.number().int(), max: z.number().int() }).refine(
    (ages) => {
      return ages.min < ages.max;
    },
    {
      message: "Minimum supported age must be less than maximum supported age.",
    }
  ),
  skills: z.array(z.nativeEnum(Skill)),
  skill_levels: z.array(z.nativeEnum(SkillLevel)),
  payment_options: z.array(z.nativeEnum(PaymentType)),
  photo: z
    .object({
      name: z.string(),
      data: z.instanceof(Buffer),
    })
    .nullable(),
  platform_links: z
    .array(
      z.object({
        platform: z.nativeEnum(Platform),
        link: z.string().min(1),
      })
    )
    .default([]),
});

export const auditoryResourceRouter = createTRPCRouter({
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const resource = await ctx.prisma.auditoryResource.findUnique({
          where: {
            id: input.id,
          },
        });

        if (!resource) {
          throw Error("not found");
        }

        return resource;
      } catch (e) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The resource you are looking for does not exist.",
          cause: e,
        });
      }
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.auditoryResource.findMany();
  }),

  create: protectedProcedure
    .input(AuditoryResourceSchema.strict())
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.auditoryResource.create({
        data: input,
      });
    }),

  update: protectedProcedure
    .input(AuditoryResourceSchema.partial().extend({ id: z.string() }))
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
