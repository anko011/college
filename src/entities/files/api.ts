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

export const fetchIsAuthorizedYandex = async (userId: number, req?: GetServerSidePropsContext['req']): Promise<boolean> => {
    const prefix = req ? origin : '/api'
    const url = `${prefix}/yandex-disk/is-authorized/${userId}`

    const response = await fetcher(url, withAuthHeader({
        method: 'GET'
    }, req));

    const data = await response.text()
    const result = JSON.parse(data) as boolean
    return result
}

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

