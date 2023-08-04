import {GetServerSidePropsContext} from "next";
import {getBackendHTTPConfig} from "@/share/lib/apiService/config";
import {BackendResponse, BodyWithMessage} from "@/share/lib/apiService/types";

const {origin} = getBackendHTTPConfig()

export const getBaseUrlByFetchSide = (req?: GetServerSidePropsContext['req']) => req ? `${origin}` : '/apiService'

export const parseResponseOrError = async <T extends {}, >(response: Promise<BackendResponse<T | BodyWithMessage>>) => {
    const res = await response
    console.log(res)
    const data = await res.json()
    if ('message' in data) throw new Error(data.message)
    return data
}
