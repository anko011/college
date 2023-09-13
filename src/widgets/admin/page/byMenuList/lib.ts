import {Menu} from "@/widgets/admin/page/byMenuList/types";
import {isPageLink} from "@/entities/pages";
import {isCategory} from "@/entities/categories";


const isBaseMenu = (obj: unknown): obj is { id: number, title: string, menuSide: string } => (
    typeof obj === 'object' && !!obj &&
    'id' in obj && typeof obj.id === 'number' &&
    'title' in obj && typeof obj.title === 'string' &&
    'menuSide' in obj && typeof obj.menuSide === 'string'
)


export const isMenu = (obj: unknown): obj is Menu => (
    isBaseMenu(obj) &&
    'items' in obj && Array.isArray(obj.items) && obj.items.every((item) => isPageLink(item) || isCategory(item))
)