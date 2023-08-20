import {PaginatedData} from "./types";

export const isPaginatedData = <T extends object>(obj: unknown): obj is PaginatedData<T> => (
    typeof obj === 'object' && !!obj &&
    'pagination' in obj && typeof obj.pagination === 'object' && !!obj.pagination &&
    'countPages' in obj.pagination && typeof obj.pagination.countPages === 'number' &&
    'currentPage' in obj.pagination && typeof obj.pagination.currentPage === 'number' &&
    'hasNextPage' in obj.pagination && typeof obj.pagination.hasNextPage === 'boolean' &&
    'hasPrevPage' in obj.pagination && typeof obj.pagination.hasPrevPage === 'boolean' &&
    'data' in obj && Array.isArray(obj.data)
)