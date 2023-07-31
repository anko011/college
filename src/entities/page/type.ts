export interface PageContentBlock {
    id: string
    type: string
    data: { [key: string]: any }
}

export interface PageContent {
    time: number
    blocks: PageContentBlock[]
    version: string
}

export interface Page {
    id: number
    title: string
    slug: string
    categoryId: number
    content: PageContent
}
