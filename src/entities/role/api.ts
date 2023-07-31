import {GetServerSidePropsContext} from "next";
import {getBackendHTTPConfig} from "@/share/config";
import {withAuthRequest} from "@/share/api";
import {isRole} from "./lib";

const {origin} = getBackendHTTPConfig()

const BackendRolesRequest = new Request(`${origin}/admin/get-roles`, {
    method: 'GET',
    headers: {
        Accept: 'application/json'
    }
})

export const fetchAllRoles = async (req?: GetServerSidePropsContext['req']) => {
    let response = req ?
        await fetch(withAuthRequest(BackendRolesRequest, req))
        : await fetch('/admin/get-roles');

    if (!response.ok) throw new Error('Не удалось получить список ролей')

    const data = await response.json()

    if (Array.isArray(data) && data.every(isRole)) return data

    throw new Error('Получен не правильный формат списка ролей')
}
