import {Fragment, useState} from "react";
import {Box, Collapse, createStyles, Group, Text} from "@mantine/core";
import {IconMenu} from "@tabler/icons-react";
import {CategoryItem} from "../categoryItem";
import {Menu} from "@/widgets/admin/page/byMenuList/types";
import {isCategory} from "@/entities/categories";
import {PageItem} from "@/widgets/admin/page/byMenuList/pageItem";
import {CreateCategoryButton, CreatePageButton} from "@/features/pages";
import {useForm} from "@mantine/form";

const useStyles = createStyles((theme, isCollapsed: boolean) => ({
    trigger: {
        cursor: 'pointer',
        background: isCollapsed ? theme.colors.blue[0] : 'transparent',
        '&:hover': {
            background: theme.colors.blue[0]
        }
    },
    content: {
        paddingLeft: theme.spacing.xs,
        borderLeft: '1px solid black'
    },
    before: {
        marginLeft: 'auto'
    }
}))


export const MenuItem = ({item}: { item: Menu }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const {classes} = useStyles(isCollapsed)
    const form = useForm({
        initialValues: {
            items: item.items
        }
    })

    const handleClick = () => setIsCollapsed((prev) => !prev)

    return (
        <Box>
            <Group className={classes.trigger} onClick={handleClick}>
                <IconMenu/>
                <Text>{item.title}</Text>
                <Group className={classes.before}>
                    <CreateCategoryButton/>
                    <CreatePageButton/>
                </Group>
            </Group>
            <Collapse in={isCollapsed}>
                <Box className={classes.content}>
                    {item.items.map((child) => (
                        <Fragment key={child.id}>
                            {isCategory(child)
                                ? <CategoryItem category={child} RenderPage={PageItem}/>
                                : <PageItem item={child}/>
                            }
                        </Fragment>
                    ))}
                </Box>
            </Collapse>
        </Box>
    )
}