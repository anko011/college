import {GetServerSidePropsContext} from "next";
import {BackendResponse, fetcher, getBackendHTTPConfig, withCheckData, withRisingError} from "@/share/lib/apiService";
import {withAuthHeader} from "@/share/lib/authService";
import {FileItemInfo} from "@/entities/files/types";
import {isFileItemInfo} from "@/entities/files/lib";

const {origin} = getBackendHTTPConfig()

const filesFetcher = async (query?: string, req?: GetServerSidePropsContext['req']): Promise<BackendResponse<FileItemInfo[]>> => {
    const prefix = req ? origin : '/api'
    const url = `${prefix}/files?${query}`
    return await fetcher(url, withAuthHeader({
        method: 'GET'
    }, req))
}

export const fetchFiles = withCheckData(withRisingError(filesFetcher), isFileItemInfo)

export const isAuthorizedYandexFetcher = async (userId: number, req?: GetServerSidePropsContext['req']): Promise<BackendResponse<{
    status: boolean
}>> => {
    const prefix = req ? origin : '/api'
    const url = `${prefix}/yandex-disk/is-authorized/${userId}`

    return fetcher(url, withAuthHeader({
        method: 'GET'
    }, req));
}

export const fetchIsAuthorizedYandex = withRisingError(isAuthorizedYandexFetcher)

const uploadFileFetcher = (file: File, path: string, req?: GetServerSidePropsContext['req']) => {
    const prefix = req ? origin : '/api'
    const url = `${prefix}/files/upload`

    const formData = new FormData()
    formData.append('file', file)
    formData.append('path', path)

    return fetcher(url, withAuthHeader({
        method: 'POST',
        body: formData
    }, req))
}

export const fetchUploadFile = withRisingError(uploadFileFetcher)


const deleteFileFetcher = (path: string, req?: GetServerSidePropsContext['req']) => {
    const prefix = req ? origin : '/api'
    const url = `${prefix}/files/delete?path=${path}`

    return fetcher(url, withAuthHeader({
        method: 'DELETE'
    }, req))
}

export const fetchDeleteFile = withRisingError(deleteFileFetcher)


const deleteDirectoryFetcher = (path: string, req?: GetServerSidePropsContext['req']) => {
    const prefix = req ? origin : '/api'
    const url = `${prefix}/files/delete-directory?path=${path}`

    return fetcher(url, withAuthHeader({
        method: 'DELETE'
    }, req))
}

export const fetchDeleteDirectory = withRisingError(deleteDirectoryFetcher)


const createDirectoryFetcher = (path: string, req?: GetServerSidePropsContext['req']) => {
    const prefix = req ? origin : '/api'
    const url = `${prefix}/files/create-directory?path=${path}`

    return fetcher(url, withAuthHeader({
        method: 'POST'
    }, req))
}

export const fetchCreateDirectory = withRisingError(createDirectoryFetcher)

const uploadFileToYandexFetcher = (path: string, req?: GetServerSidePropsContext['req']) => {
    const url = `/api/yandex-disk/upload-to-yandex?path=${path}`
    return fetcher(url, withAuthHeader({
        method: 'POST'
    }, req))
}

export const fetchUploadToYandex = withRisingError(uploadFileToYandexFetcher)
