import {GetServerSidePropsContext, NextApiRequest} from "next";
import {getBackendHTTPConfig} from "@/share/config";
import {withAuthRequest} from "@/share/api";
import {CreateUserDto, User} from "./types";

const {origin} = getBackendHTTPConfig()


type DataResponseNotOk = {
    message: string
}


const getBaseUrlByFetchSide = (req?: GetServerSidePropsContext['req']) => req ? `${origin}` : '/api'

const requestFactory = (input: RequestInfo | URL, init?: RequestInit): (req?: GetServerSidePropsContext['req']) => Request => (req) => {
    const request = new Request(input, init)
    return req ? withAuthRequest(request, req) : request
}

export const fetchAllUsers = async (req?: GetServerSidePropsContext['req']): Promise<DataResponseNotOk | User[]> => {
    const url = `${getBaseUrlByFetchSide(req)}/admin/get-users`
    console.log(url)
    const requestBuilder = requestFactory(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })

    const response = await fetch(requestBuilder(req))
    return response.json()
}


export const fetchCreateUser = async (dto: CreateUserDto, req?: NextApiRequest): Promise<DataResponseNotOk | User> => {
    const url = `${getBaseUrlByFetchSide(req)}/admin/create-user`
    const requestBuilder = requestFactory(url, {
        method: 'POST',
        body: JSON.stringify(dto),
        headers: {
            Accept: 'application/json'
        }
    })

    const response = await fetch(requestBuilder(req))
    return response.json()
}

export const fetchDeleteUser = async (userId: number, req?: NextApiRequest): Promise<DataResponseNotOk | never> => {
    const url = `${getBaseUrlByFetchSide(req)}/admin/delete-user`

    const requestBuilder = requestFactory(url, {
        method: 'DELETE'
    })

    const response = await fetch(requestBuilder(req))
    return response.json()
}


