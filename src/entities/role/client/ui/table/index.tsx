import {ReactElement} from "react";
import {getRoleTableDictionary} from "./i18n";

interface RoleRowProps {
    name: string
    actions?: ReactElement[]
}


interface RoleTableHeaderProps {
    actionTitles: ReactElement[]
}

const dictionary = getRoleTableDictionary('ru')

export function RoleTableHeader({actionTitles}: RoleTableHeaderProps) {
    return (
        <thead>
        <tr>
            <th>{dictionary.roleTable.header.login}</th>
            {actionTitles?.length && actionTitles.map((title, index) => (
                <th key={index}>
                    {title}
                </th>
            ))}
        </tr>
        </thead>
    )
}

export function RoleTableRow({name, actions}: RoleRowProps) {
    return (
        <tr>
            <td>{name}</td>
            {actions?.length && actions.map(action => action && (
                <td key={action.toString()}>
                    {action}
                </td>
            ))}
        </tr>
    )
}
