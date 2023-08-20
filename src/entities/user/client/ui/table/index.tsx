import {ReactNode} from "react";
import {getUserDictionary} from "../../../i18n";
import {User} from "@/entities/user";

interface UserRowProps {
    user: User
    before?: (render: (node: ReactNode) => ReactNode) => ReactNode
}


interface UserTableHeaderProps {
    before?: (render: (node: ReactNode) => ReactNode) => ReactNode
}

const userDictionary = getUserDictionary('ru')

export function UserTableHeader({before}: UserTableHeaderProps) {
    const render = (node: ReactNode) => <th>{node}</th>
    return (
        <thead>
        <tr>
            <th>{userDictionary.user.login}</th>
            <th>{userDictionary.user.firstName}</th>
            <th>{userDictionary.user.secondName}</th>
            <th>{userDictionary.user.patronymic}</th>
            {before?.(render)}
        </tr>
        </thead>
    )
}

export function UserTableRow({user, before}: UserRowProps) {
    const render = (node: ReactNode) => <td>{node}</td>
    return (
        <tr>
            <td>{user.login}</td>
            <td>{user.firstName}</td>
            <td>{user.secondName}</td>
            <td>{user.patronymic}</td>
            {before?.(render)}
        </tr>
    )
}
