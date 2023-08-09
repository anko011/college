import NextLink from 'next/link'
import {Anchor, AspectRatio} from "@mantine/core";
import {useHover} from "@mantine/hooks";

interface LinkCardProps {
    href: string
    title: string
}

export const LinkCard = ({href, title}: LinkCardProps) => {
    const {ref, hovered} = useHover<HTMLAnchorElement>()
    return (
        <AspectRatio ratio={1}>
            <Anchor
                sx={{
                    transition: 'background 200ms'
                }}
                ref={ref}
                bg={hovered ? 'cyan.4' : 'cyan'}
                variant="ligthen"
                color="white"
                href={href}
                underline={false}
                component={NextLink}
            >
                {title}
            </Anchor>
        </AspectRatio>
    )
}