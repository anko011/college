import {useAppRouter} from "./useAppRouter";
import {getNumberFromQuery} from "@/share/lib/queryService";

export const useQueryPagination = (pageQueryKey: string, limitQueryKey: string) => {
    const router = useAppRouter()

    return {
        getCurrentPage() {
            return getNumberFromQuery(router.query, pageQueryKey) ?? 1
        },
        setPage(value: string | number) {
            router.updateQuery(pageQueryKey, value.toString())
        }
    }
}