import {createContext, useContext} from "react";
import {UserWithRole} from "../../types";

export const UsersContext = createContext<UserWithRole[]>([])
export const useUsers = () => useContext(UsersContext)


export const UserContext = createContext<UserWithRole | null>(null)
export const useUser = () => useContext(UserContext)