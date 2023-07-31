import {filterDataByAnyField} from "@/share/utils/index";

export function sortByAnyField<T extends { [key: string]: any }>(
    data: T[],
    {sortBy, ...payload}: {
        sortBy: keyof T | null,
        reversed: boolean,
        search: string
    }) {

    if (!sortBy) {
        return filterDataByAnyField(data, payload.search);
    }

    return filterDataByAnyField(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return b[sortBy].toString().localeCompare(a[sortBy]);
            }

            return a[sortBy].toString().localeCompare(b[sortBy]);
        }),
        payload.search
    );
}
