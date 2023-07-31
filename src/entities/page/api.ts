import getConfig from 'next/config'
import {Page} from "./type";

const {publicRuntimeConfig} = getConfig()

export const getAllPages = async (): Promise<Page[]> => {
    const response = await fetch(`${publicRuntimeConfig.backend}/pages/`)
    return response.json()
}

export const getPageById = async (pageId: number | string): Promise<Page> => {
    const response = await fetch(`${publicRuntimeConfig.backend}/pages/${pageId}`)
    return response.json()
}


export const getPagesByCategoryId = async (categoryId: number): Promise<Page[]> => {
    const response = await fetch(`${publicRuntimeConfig.backend}/pages?categoryId=${categoryId}`)
    return response.json()
}


export const deletePage = async (pageId: number) => {
    const response = await fetch(`${publicRuntimeConfig.backend}/pages/${pageId}`, {
        method: 'DELETE'
    })
    return response.status
}
