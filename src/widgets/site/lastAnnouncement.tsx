import {ImageLinkWithDate, OrangeBox} from "@/share/client/components/site";
import {Anchor, AspectRatio} from "@mantine/core";
import NextLink from "next/link";
import {useMediaQuery} from "@mantine/hooks";
import {OrangeBoxCompact} from "@/share/client/components/site/orangeBoxCompact";

interface LastAnnouncementProps {
    date: Date
    label: string
    href: string
    imageSrc: string
}

export const LastAnnouncement = ({date, imageSrc, label, href}: LastAnnouncementProps) => {
    const isBigPhone = useMediaQuery('(max-width: 29.57em)');
    const Wrapper = isBigPhone ? OrangeBoxCompact : OrangeBox
    return (
        <Wrapper
            title="Последнее объявление"
            endHeader={
                <Anchor
                    component={NextLink}
                    color="black"
                    size="xs"
                    href="/"
                >
                    Смотреть все объявления...
                </Anchor>
            }
        >
            <AspectRatio ratio={3}>
                <ImageLinkWithDate
                    date={date}
                    label={label}
                    href={href}
                    src={imageSrc}
                />
            </AspectRatio>
        </Wrapper>
    )
}