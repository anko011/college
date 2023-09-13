import {PageLink, PageLinkWithImage} from "./types";

export const isPageLink = (obj: unknown): obj is PageLink =>
    (
        typeof obj === 'object' && !!obj && Object.keys(obj).length === 3 &&
        'id' in obj && typeof obj.id === 'number' &&
        'slug' in obj && typeof obj.slug === 'string' &&
        'title' in obj && typeof obj.title === 'string'
    )

export const isPageLinkWithImage = (obj: unknown): obj is PageLinkWithImage => (
    typeof obj === 'object' && !!obj &&
    'id' in obj && typeof obj.id === 'number' &&
    'slug' in obj && typeof obj.slug === 'string' &&
    'title' in obj && typeof obj.title === 'string' &&
    'imageSrc' in obj && typeof obj.imageSrc === 'string' &&
    'imageAlt' in obj && typeof obj.imageAlt === 'string'
)