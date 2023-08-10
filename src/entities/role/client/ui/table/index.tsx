import {ReactElement} from "react";
import {getRoleDictionary} from "@/entities/role/i18n";

interface RoleRowProps {
    name: string
    actions?: ReactElement[]
}


interface RoleTableHeaderProps {
    actionTitles: ReactElement[]
}

const roleDictionary = getRoleDictionary('ru')

export function RoleTableHeader({actionTitles}: RoleTableHeaderProps) {
    return (
        <thead>
        <tr>
            <th>{roleDictionary.role.name}</th>
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
            {actions?.length && actions.map((action, index) => action && (
                <td key={index}>
                    {action}
                </td>
            ))}
        </tr>
    )
}
