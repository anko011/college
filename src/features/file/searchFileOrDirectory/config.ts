export const getSearchFileOrDirectoryConfig = (): {
    readonly searchQuery: string,
    readonly backendSearchQuery: string
} => ({
    searchQuery: 'search',
    backendSearchQuery: 'query'
})