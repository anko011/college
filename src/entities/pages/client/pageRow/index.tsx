import {Box, createStyles, Group, Text} from "@mantine/core";
import {ReactNode} from "react";
import {IconFile} from "@tabler/icons-react";

interface PageRowProps {
    label: string
    before?: ReactNode
}

const useStyles = createStyles((theme) => ({
    before: {
        marginLeft: 'auto'
    }
}))

export const PageRow = ({label, before}: PageRowProps) => {
    const {classes} = useStyles()
    return (
        <Group spacing="xs">
            <IconFile/>
            <Text>{label}</Text>
            {before && <Box className={classes.before}>{before}</Box>}
        </Group>
    )
}