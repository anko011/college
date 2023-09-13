import {Box, createStyles, Text} from "@mantine/core";
import {IconFolder} from "@tabler/icons-react";
import {ReactNode} from "react";

interface DirInfoRowProps {
    dirName: string
    before?: ReactNode
    label?: ReactNode
}

const useStyles = createStyles((theme) => ({
    root: {
        display: "flex",
        gap: theme.spacing.xs,
        alignItems: 'center'
    },
    before: {
        marginLeft: 'auto'
    }
}))

export const DirInfoRow = ({dirName, before, label}: DirInfoRowProps) => {
    const {classes} = useStyles()

    label = label ? label : <Text>{dirName}</Text>

    return (
        <Box className={classes.root}>
            <IconFolder/>
            {label}
            <Box className={classes.before}>{before}</Box>
        </Box>
    )
}