import {GetServerSidePropsContext} from "next";
import {BackendResponse, fetcher, getBackendHTTPConfig, withCheckData, withRisingError} from "@/share/lib/apiService";
import {withAuthHeader} from "@/share/lib/authService";
import {isPermission} from "./lib";
import {Permission} from "./types";

const {origin} = getBackendHTTPConfig()

const permissionsFetcher = async (req?: GetServerSidePropsContext['req']): Promise<BackendResponse<Permission[]>> => {
    const url = req ? `${origin}/admin/get-permissions` : `/api/admin/get-permissions`
    return await fetcher(url, withAuthHeader({
        method: 'GET'
    }, req));
}

export const fetchPermissions = withCheckData(withRisingError(permissionsFetcher), isPermission)