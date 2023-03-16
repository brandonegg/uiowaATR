import { type Platform } from "@prisma/client";

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