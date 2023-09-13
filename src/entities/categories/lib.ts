import {isPageLink} from "@/entities/pages/@x";
import {Category} from "./types";

export const isCategory = (obj: unknown): obj is Category => (
    typeof obj === 'object' && !!obj && Object.keys(obj).length === 4 &&
    'id' in obj && typeof obj.id === 'number' &&
    'title' in obj && typeof obj.title === 'string' &&
    'slug' in obj && typeof obj.slug === 'string' &&
    'items' in obj && Array.isArray(obj.items) && obj.items.every((item) => isPageLink(item) || isCategory(item))
)