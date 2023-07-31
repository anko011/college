export enum MenuPosition {
    Top = 'TOP',
    Left = 'LEFT',
    RIGHT = 'RIGHT'
}

export interface Category {
    id: number
    title: string
    slug: string
    menuPosition: MenuPosition | null
}
