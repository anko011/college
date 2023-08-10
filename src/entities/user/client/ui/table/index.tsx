import {ReactElement} from "react";
import {Box} from "@mantine/core";
import {getUserDictionary} from "../../../i18n";

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

const userDictionary = getUserDictionary('ru')

export function UserTableHeader({actionTitles}: UserTableHeaderProps) {
    return (
        <thead>
        <tr>
            <th>{userDictionary.user.login}</th>
            <th>{userDictionary.user.firstName}</th>
            <th>{userDictionary.user.secondName}</th>
            <th>{userDictionary.user.patronymic}</th>
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
