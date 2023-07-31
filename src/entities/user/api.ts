import {getBackendHTTPConfig} from "@/share/config";
import {isUser} from "@/entities/user/lib";
import {GetServerSidePropsContext} from "next";
import {withAuthRequest} from "@/share/api";

const {origin} = getBackendHTTPConfig()

export const UserBackendRequest = new Request(`${origin}/admin/get-users`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    }
})

export const fetchAllUsers = async (req?: GetServerSidePropsContext['req']) => {
    let response = undefined

    if (req) {
        const request = withAuthRequest(UserBackendRequest, req)
        response = await fetch(request)
    } else {
        response = await fetch('/admin/get-users')
    }

    if (!response.ok) throw new Error('Не удалось загрузить список пользователей')

    const data = await response.json()

    if (Array.isArray(data) && data.every(isUser)) return data

    throw new Error('Загруженный список пользователей имеет неверный формат')
}


