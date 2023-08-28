import {Box, createStyles, Text} from "@mantine/core";
import {FileInfo} from "@/entities/files/types";
import {IconFile} from "@tabler/icons-react";
import {ReactNode} from "react";

interface FileInfoRowProps {
    file: FileInfo
    before?: ReactNode
    label?: ReactNode
}

const useStyles = createStyles((theme) => ({
    root: {
        display: "flex",
        gap: theme.spacing.xs,
        alignItems: 'center',
    },
    before: {
        marginLeft: 'auto'
    }
}))

export const FileInfoRow = ({file, before, label}: FileInfoRowProps) => {
    const {classes} = useStyles()
    label = label ?? <Text>{file.name}</Text>
    return (
        <Box className={classes.root}>
            <IconFile/>
            {label}
            {before && <Box className={classes.before}>{before}</Box>}
        </Box>
    )
}