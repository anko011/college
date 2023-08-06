import {GetServerSidePropsContext} from "next";
import {BackendResponse, fetcher, getBackendHTTPConfig, withCheckData, withRisingError} from "@/share/lib/apiService";
import {withAuthHeader} from "@/share/lib/authService";
import {Role} from "./types";
import {isRole} from "./lib";

const {origin} = getBackendHTTPConfig()

const rolesFetcher = async (page: number = 1, req?: GetServerSidePropsContext['req']): Promise<BackendResponse<Role[]>> => {
    const url = req ? `${origin}/admin/get-roles?page=${page}` : `/api/admin/get-roles?page=${page}`
    return await fetcher(url, withAuthHeader({
        method: 'GET'
    }, req));
}

export const fetchRoles = withCheckData(withRisingError(rolesFetcher), isRole)


