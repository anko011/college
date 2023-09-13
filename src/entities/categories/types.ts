import {PageLink} from "@/entities/pages/@x";

export interface Category {
    id: number
    title: string
    slug: string
    items: (Category | PageLink)[]
}
