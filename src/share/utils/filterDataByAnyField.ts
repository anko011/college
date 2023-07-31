export function filterDataByAnyField<T extends { [key: string]: any }>(data: T[], search: string) {
    const query = search.toLowerCase().trim()
    return data
        .filter((item) => Object
            .keys(data[0])
            .some((key) => item[key]
                .toString()
                .toLowerCase()
                .includes(query)))
}
