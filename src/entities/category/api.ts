import {Category} from "./types";


export function _getAllCategories(): Request {
}

export function _getCategoryById(categoryId: number | string) {
}

export const getAllCategories = async (): Promise<Category[]> => {

}

export const getCategoryById = async (categoryId: number): Promise<Category> => {

}

export const createCategory = async (category: Omit<Category, 'id'>) => {

}

export const deleteCategory = async (categoryId: number) => {

}

export const updateCategory = async (category: Category) => {

}
