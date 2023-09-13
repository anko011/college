export interface PageLink {
    id: number
    slug: string
    title: string
}

export interface PageLinkWithImage extends PageLink {
    imageSrc: string
    imageAlt: string
}
