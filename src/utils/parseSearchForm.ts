import {
  type Platform,
  type RangeInput,
  type Skill,
  type SkillLevel,
} from "@prisma/client";
import { type ParsedUrlQuery } from "querystring";

export interface ViewDetails {
  page: number;
  perPage: number;
}

export interface SearchQuery {
  age?: RangeInput;
  platforms?: Platform[];
  skill_levels?: SkillLevel[];
  skills?: Skill[];
}

export type ParsedQueryData = SearchQuery & ViewDetails;

export const parseQueryData = (query: ParsedUrlQuery): ParsedQueryData => {
  const view = {
    page: Number(query["page"] ?? 1),
    perPage: Number(query["perPage"] ?? 10),
  };
  const filter: SearchQuery = {};

  if (query["ages"]) {
    const ages: number[] = [];

    if (Array.isArray(query["ages"])) {
      const validRanges = query["ages"].filter((value) => {
        return value.split("-").length == 2;
      });

      validRanges.forEach((value) => {
        const split = value.split("-");
        ages.push(Number(split[0]));
        ages.push(Number(split[1]));
      });
    } else {
      const split = query["ages"].split("-");
      ages.push(Number(split[0]));
      ages.push(Number(split[1]));
    }

    filter.age = {
      min: Math.min(...ages),
      max: Math.max(...ages),
    };
  }

  if (query["platforms"]) {
    if (Array.isArray(query["platforms"])) {
      filter.platforms = query["platforms"] as Platform[];
    } else {
      filter.platforms = [query["platforms"]] as Platform[];
    }
  }

  if (query["skill_levels"]) {
    if (Array.isArray(query["skill_levels"])) {
      filter.skill_levels = query["skill_levels"] as SkillLevel[];
    } else {
      filter.skill_levels = [query["skill_levels"]] as SkillLevel[];
    }
  }

  if (query["skills"]) {
    if (Array.isArray(query["skills"])) {
      filter.skills = query["skills"] as Skill[];
    } else {
      filter.skills = [query["skills"]] as Skill[];
    }
  }

  return { ...filter, ...view };
};
