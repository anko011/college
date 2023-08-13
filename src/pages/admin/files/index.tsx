import {Anchor, Button, Chip, Divider, FileButton, Group, Text, TextInput} from '@mantine/core'
import {appGetServerSideProps} from "@/widgets/appGetServerSideProps";
import {IconFile, IconFolder} from "@tabler/icons-react";
import {withAdminLayout} from "@/widgets/admin";
import NextLink from "next/link";

export const getServerSideProps = appGetServerSideProps(async ({user}) => {
    return {
        props: {user}
    }
})


const DirectoryItem = ({name}: { name: string }) => {
    return (
        <Group p="xs">
            <IconFolder/>
            <Anchor component={NextLink} href="/admin/files">
                <Text>{name}</Text>
            </Anchor>
        </Group>
    )
}

const FileItem = ({name}: { name: string }) => {
    return (
        <Group p="xs">
            <IconFile/>
            <Anchor component={NextLink} href="/admin/files">
                <Text>{name}</Text>
            </Anchor>
            <Group ml="auto">
                <Chip>Яндекст диск</Chip>
            </Group>
        </Group>
    )
}


export const AdminFilesPage = () => {
    return (
        <>
            <Group>
                <FileButton onChange={() => {
                }}>
                    {props => (
                        <Button {...props}>Добавить файл</Button>
                    )}
                </FileButton>
                <Button>Добавить директорию</Button>
                <Group ml="auto">
                    <TextInput my="md" placeholder="Поиск по файла или директории"/>
                    <Button>Найти</Button>
                </Group>
            </Group>
            <DirectoryItem name="Учебные листы"/>
            <DirectoryItem name="Учебные листы"/>
            <DirectoryItem name="Учебные листы"/>
            <DirectoryItem name="Учебные листы"/>
            <Divider/>
            <FileItem name="main.js"/>
            <FileItem name="main.js"/>
            <FileItem name="main.js"/>
            <FileItem name="main.js"/>
            <FileItem name="main.js"/>
        </>
    )
}


export default withAdminLayout(AdminFilesPage)