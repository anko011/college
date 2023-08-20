export enum NavigationType {
    Category = 'CATEGORY',
    Link = 'LINK'
}

export interface NavigationLinkItem {
    id: number
    label: string
    type: NavigationType.Link
    href: string
}

export interface NavigationCategoryItem {
    id: number
    label: string
    type: NavigationType.Category
    children: (NavigationCategoryItem | NavigationLinkItem)[]
}