import { Skill, type Platform } from "@prisma/client";

/**
 * Takes a platform enum and translates it to readable form.
 */
export const translateEnumPlatform = (value: Platform) => {
    switch(value) {
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
            return "Website"
        }
    }
}

/**
 * Takes a skill enum value and translates it to human text
 * @param value 
 */
export const translateEnumSkill = (value: Skill) => {
    switch(value) {
        case "ENVIRONMENT": {
            return "not done";
        }
        case "BACKGROUND": {
            return "not done";
        }
        case "DISCOURSE": {
            return "not done";
        }
        case "MUSIC": {
            return "Music"
        }
        case "PHONEMES": {
            return "not done";
        }
        case "SENTENCES": {
            return "Sentences"
        }
        case "WORDS": {
            return "Word Recognition"
        }
    }
}