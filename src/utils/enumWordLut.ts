import { type Skill, type Platform } from "@prisma/client";

/**
 * Takes a platform enum and translates it to readable form.
 */
export const translateEnumPlatform = (value: Platform) => {
  switch (value) {
    case "APP_ANDROID": {
      return "Android";
    }
    case "APP_IOS": {
      return "Apple";
    }
    case "PDF": {
      return "PDF Document";
    }
    case "WEBSITE": {
      return "Website";
    }
  }
};

/**
 * Takes a skill enum value and translates it to human text
 * @param value
 */
export const translateEnumSkill = (value: Skill) => {
  switch (value) {
    case "ENVIRONMENT": {
      return "Environmental Sounds";
    }
    case "BACKGROUND": {
      return "Background";
    }
    case "DISCOURSE": {
      return "Discourse/Complex";
    }
    case "MUSIC": {
      return "Music Appreciation";
    }
    case "PHONEMES": {
      return "Phonemes";
    }
    case "SENTENCES": {
      return "Sentences";
    }
    case "WORDS": {
      return "Words";
    }
  }
};
