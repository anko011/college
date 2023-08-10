import {createContext, useContext} from "react";
import {RoleWithPermissions} from "@/entities/role";

export const RolesContext = createContext<RoleWithPermissions[]>([])

export const useRoles = () => {
    return useContext(RolesContext)
}