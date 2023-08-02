import {ReactElement} from "react";
import {Box} from "@mantine/core";
import {getUserTableDictionary} from "./i18n";

interface UserRowProps {
    login: string
    firstName: string
    secondName: string
    patronymic: string
    actions?: ReactElement[]
}


interface UserTableHeaderProps {
    actionTitles: ReactElement[]
}

const userDictionary = getUserTableDictionary('ru')

export function UserTableHeader({actionTitles}: UserTableHeaderProps) {
    return (
        <thead>
        <tr>
            <th>{userDictionary.userTable.header.login}</th>
            <th>{userDictionary.userTable.header.firstName}</th>
            <th>{userDictionary.userTable.header.secondName}</th>
            <th>{userDictionary.userTable.header.patronymic}</th>
            {actionTitles?.length && actionTitles.map((title, index) => (
                <th
                    key={index}
                >
                    {title}
                </th>
            ))}
        </tr>
        </thead>
    )
}

export function UserTableRow({login, firstName, secondName, patronymic, actions}: UserRowProps) {
    return (
        <tr>
            <td>{login}</td>
            <td>{firstName}</td>
            <td>{secondName}</td>
            <td>{patronymic}</td>
            {actions?.length && actions.map(action => action && (
                <Box
                    component='td'
                    key={action.toString()}
                >
                    {action}
                </Box>
            ))}
        </tr>
    )
}
