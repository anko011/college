import NextLink from 'next/link'
import {Anchor} from "@mantine/core";

interface LinkCardProps {
    href: string
    title: string
}

export const LinkCard = ({href, title}: LinkCardProps) => {
    return (
        <Anchor
            variant="ligthen"
            href={href}
            component={NextLink}
        >
            {title}
        </Anchor>
    )
}