import {PageLink, PageLinkWithImage} from "@/entities/pages";
import {Category} from "@/entities/categories";

export enum MenuSide {
    LEFT = 'LEFT',
    RIGHT = "RIGHT",
    HEADER = 'HEADER'
}

export interface Menu {
    id: number
    title: string
    items: (Category | PageLink | PageLinkWithImage)[]
    menuSide: MenuSide
}