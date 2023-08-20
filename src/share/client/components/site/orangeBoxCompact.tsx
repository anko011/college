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

export const OrangeBoxCompact = ({children, title, endHeader}: OrangeBoxProps) => {
    const {classes} = useStyles()

    return (
        <Stack className={classes.root} w="100%">
            <Flex justify="space-between" align="center" direction="column" w="100%">
                <Title order={3} fw={400} mb="xs">{title}</Title>
                <Divider color="black" w="100%"/>
                <Box className={classes.content} w="100%" mb="xs">
                    {children}
                </Box>
                {endHeader}
            </Flex>
        </Stack>
    )
}