import {ReactNode} from "react";
import {Box, createStyles, Divider, Flex, Stack, Title} from "@mantine/core";

interface OrangeBoxProps {
    children?: ReactNode
    endHeader?: ReactNode
    title: string
}

const useStyles = createStyles((theme) => ({
    root: {
        background: '#fef0cf',
        padding: theme.spacing.xl,
        borderRadius: theme.radius.lg,
        boxShadow: '0 0 4px 0 rgb(0 0 0 / 25%)',
    },
    content: {
        position: 'relative'
    }
}))

export const OrangeBox = ({children, title, endHeader}: OrangeBoxProps) => {
    const {classes} = useStyles()

    return (
        <Stack className={classes.root}>
            <Flex justify="space-between" align="center">
                <Title order={3} fw={400}>{title}</Title>
                {endHeader}
            </Flex>
            <Divider color="black"/>
            <Box className={classes.content}>
                {children}
            </Box>
        </Stack>
    )
}