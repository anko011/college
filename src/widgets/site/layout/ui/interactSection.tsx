import {ActionIcon, Flex, TextInput} from "@mantine/core";
import {IconEye, IconLogin} from "@tabler/icons-react";


export const InteractiveSection = () => {
    return (
        <>
            <TextInput placeholder='Поиск по сайту...'/>
            <Flex justify="center" gap="md">
                <ActionIcon variant="filled" color="peach.2">
                    <IconLogin/>
                </ActionIcon>
                <ActionIcon variant="filled" color="peach.2">
                    <IconEye/>
                </ActionIcon>
            </Flex>
        </>
    )
}