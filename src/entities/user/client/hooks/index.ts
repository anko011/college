import {createContext, useContext} from "react";
import {UserWithRole} from "../../types";

export const UsersContext = createContext<UserWithRole[]>([])

export const useUsers = () => {
    return useContext(UsersContext)
}