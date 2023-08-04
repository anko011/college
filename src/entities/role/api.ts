import {GetServerSidePropsContext} from "next";
import {BackendResponse, BodyWithMessage, getBackendHTTPConfig} from "@/share/lib/apiService";
import {withAuthHeader} from "@/share/lib/authService";
import {Role} from "./types";

const {origin} = getBackendHTTPConfig()

export const fetchRoles = async (page: number = 1, req?: GetServerSidePropsContext['req']): Promise<BackendResponse<BodyWithMessage | Role[]>> =>
    await fetch(`${origin}/admin/get-roles?page=${page}`, withAuthHeader({
        method: 'GET'
    }, req))
