import {ActionIcon, Flex, TextInput} from "@mantine/core";
import {IconEye, IconLogin} from "@tabler/icons-react";
import NextLink from "next/link";


export const InteractiveSection = () => {
    return (
        <>
            <TextInput placeholder='Поиск по сайту...'/>
            <Flex justify="center" gap="md">
                <ActionIcon variant="filled" color="peach.2" component={NextLink} href="/admin">
                    <IconLogin/>
                </ActionIcon>
                <ActionIcon variant="filled" color="peach.2">
                    <IconEye/>
                </ActionIcon>
            </Flex>
        </>
    )
}