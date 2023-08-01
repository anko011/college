import {GetServerSidePropsContext} from "next";
import {BackendResponse, BodyWithMessage, createRequestCreatorByFetchSide, getBaseUrlByFetchSide} from "@/share/api";
import {Role} from "./types";


export const fetchRoles = async (page: number = 1, req?: GetServerSidePropsContext['req']): Promise<BackendResponse<BodyWithMessage | Role[]>> => {
    const url = `${getBaseUrlByFetchSide(req)}/admin/get-roles?page=${page}`

    const requestCreator = createRequestCreatorByFetchSide(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })

    return await fetch(requestCreator(req))
}
