import {createContext, useContext} from "react";
import {Permission} from "@/entities/permission";

export const PermissionContext = createContext<Permission[]>([])

export const usePermissions = () => {
    return useContext(PermissionContext)
}