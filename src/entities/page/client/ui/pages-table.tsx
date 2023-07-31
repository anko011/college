import {ReactNode, useRef} from "react";
import {Table, Text} from "@mantine/core";
import {Page} from "@/entities/page/type";

interface PagesTableProps {
    pages: Page[]

    action?(page: Page): ReactNode

    renderRow?(page: Page): ReactNode
}

export function PagesTable({pages, action, renderRow}: PagesTableProps) {
    const items = useRef(pages.map((page, index) => ({id: Date.now() + index, value: page})))

    return (
        <Table>
            <thead>
            <tr>
                <th>Название</th>
                <th>Slug</th>
                {action && <th></th>}
            </tr>
            </thead>
            <tbody>
            {items.current.length ? items.current.map(item => (
                <tr key={item.id}>
                    {renderRow ? renderRow(item.value) : (
                        <>
                            <td>{item.value.title}</td>
                            <td>{item.value.slug}</td>
                        </>
                    )}
                    {action && (<td>{action(item.value)}</td>)}
                </tr>
            )) : (
                <tr>
                    <td colSpan={2}>
                        <Text align="center">Страницы в категории отсутствуют</Text>
                    </td>
                </tr>
            )}
            </tbody>
        </Table>
    )
}
