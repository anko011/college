import {GetServerSidePropsContext} from "next";
import {getBackendHTTPConfig} from "@/share/config";
import {fetchData} from "@/share/api";
import {isRole} from "./lib";

const {origin} = getBackendHTTPConfig()

export async function getAllRoles(ctx: GetServerSidePropsContext) {
    const response = await fetchData(ctx, new Request(`${origin}/admin/get-roles`))

    if (!response.ok) throw new Error('Не удалось загрузить список ролей')

    const data = await response.json()

    if (Array.isArray(data) && data.every(isRole)) return data

    throw new Error('Неверный формат списка ролей')
}
