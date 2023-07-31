import {Accordion, Box} from "@mantine/core";
import {Category} from "@/entities/category/types";
import {ReactNode} from "react";

interface CategoryAccordionProps {
    categories: Category[]

    action?(category: Category): ReactNode

    categoryContent(category: Category): ReactNode
}

export function CategoryAccordion({categories, categoryContent, action}: CategoryAccordionProps) {
    return (
        <Accordion>
            {categories.map(category => (
                <Accordion.Item key={category.id} value={category.id.toString()}>
                    {action ? (
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Accordion.Control>{category.title}</Accordion.Control>
                            {action(category)}
                        </Box>
                    ) : (
                        <Accordion.Control>{category.title}</Accordion.Control>
                    )}

                    <Accordion.Panel>
                        {categoryContent(category)}
                        {/*<TableSort*/}
                        {/*    data={category.page}*/}
                        {/*    headers={{title: 'Название страницы', slug: 'Slug'}}*/}
                        {/*    renderRows={*/}
                        {/*        (sortedData) => sortedData.map(page => (*/}
                        {/*            <tr key={page.id}>*/}
                        {/*                <td>*/}
                        {/*                    <Anchor onClick={handleClickPageTitle(page)}>*/}
                        {/*                        {page.title}*/}
                        {/*                    </Anchor>*/}
                        {/*                </td>*/}
                        {/*                <td>{page.slug}</td>*/}
                        {/*            </tr>*/}
                        {/*        ))*/}
                        {/*    }/>*/}
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}
