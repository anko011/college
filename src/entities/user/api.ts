import {GetServerSidePropsContext} from "next";
import {getBackendHTTPConfig} from "@/share/config";
import {fetchData} from "@/share/api";
import {isUser} from "./lib";
import {CreateUserDto} from "./types";
import {TokenSet} from "@/share/lib/tokenService";

const {origin} = getBackendHTTPConfig()

export async function getAllUsers(ctx: GetServerSidePropsContext) {
    const response = await fetchData(ctx, new Request(`${origin}/admin/get-users`))

    if (!response.ok) throw new Error('Не удалось загрузить список пользователей')

    const data = await response.json()

    if (Array.isArray(data) && data.every(isUser)) return data

    throw new Error('Не верный формат ответа списка пользователей')
}

export async function createUser(dto: CreateUserDto, tokenSet: TokenSet) {

}