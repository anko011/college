import {Box, Collapse, createStyles, Group, Text} from "@mantine/core";
import {ReactNode, useState} from "react";
import {IconCategory} from "@tabler/icons-react";

interface CollapsedCategoryRowProps {
    label: string
    children?: ReactNode
    before?: ReactNode
}

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

export const CollapsedCategoryRow = ({label, children, before}: CollapsedCategoryRowProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const {classes} = useStyles(isCollapsed)
    const handleClick = () => setIsCollapsed((prev) => !prev)

    return (
        <Box>
            <Group className={classes.trigger} onClick={handleClick} spacing="xs">
                <IconCategory/>
                <Text>{label}</Text>
                {before && <Box className={classes.before}>{before}</Box>}
            </Group>
            <Collapse in={isCollapsed} className={classes.content}>
                {children}
            </Collapse>
        </Box>
    )
}