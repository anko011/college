import {Category, isCategory} from "@/entities/categories";
import {CollapsedCategoryRow} from "@/entities/categories/client";
import {PageLink} from "@/entities/pages";
import {ComponentType, Fragment} from "react";
import {Group} from "@mantine/core";
import {CreateCategoryButton, CreatePageButton, DeleteCategoryButton} from "@/features/pages";

interface CategoryMenuProps {
    category: Category,
    RenderPage: ComponentType<{ item: PageLink }>
}

export const CategoryItem = ({category, RenderPage}: CategoryMenuProps) => {

    return (
        <CollapsedCategoryRow label={category.slug} before={(
            <Group>
                <CreateCategoryButton/>
                <CreatePageButton/>
                <DeleteCategoryButton/>
            </Group>
        )}>
            {category.items.map((child) => (
                <Fragment key={child.id}>
                    {isCategory(child)
                        ? <CategoryItem category={child} RenderPage={RenderPage}/>
                        : <RenderPage item={child}/>
                    }
                </Fragment>
            ))}
        </CollapsedCategoryRow>
    )
}
