import {NavigationCategoryItem, NavigationLinkItem, NavigationType} from "@/widgets/site/layout/types";

export const isNavigationLinkItem = (obj: unknown): obj is NavigationLinkItem => {
    return (
        typeof obj === 'object' && !!obj &&
        'id' in obj && typeof obj.id === 'number' &&
        'label' in obj && typeof obj.label === 'string' &&
        'href' in obj && typeof obj.href === 'string' &&
        'type' in obj && obj.type === NavigationType.Link
    );
}

export const isNavigationCategoryItem = (obj: unknown): obj is NavigationCategoryItem => (
    typeof obj === 'object' && !!obj &&
    'id' in obj && typeof obj.id === 'number' &&
    'label' in obj && typeof obj.label === 'string' &&
    'type' in obj && obj.type === NavigationType.Category &&
    'children' in obj && Array.isArray(obj.children) && obj.children
        .every((item) => isNavigationLinkItem(item) || isNavigationCategoryItem(item))
)