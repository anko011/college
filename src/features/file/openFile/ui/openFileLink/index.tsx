import {Anchor} from "@mantine/core";
import NextLink from "next/link";

interface OpenFileLinkProps {
    url: string
    name: string
}

export const OpenFileLink = ({url, name}: OpenFileLinkProps) => {
    return (
        <Anchor component={NextLink} href={`${url}`}>
            {name}
        </Anchor>
    )
}