import NextLink from "next/link";
import {Anchor, AspectRatio, Flex, px, useMantineTheme} from "@mantine/core";
import {ImageLinkWithDate, OrangeBox} from "@/share/client/components/site";
import {News} from "@/entities/news";
import {useMediaQuery} from "@mantine/hooks";
import {OrangeBoxCompact} from "@/share/client/components/site/orangeBoxCompact";

interface LastNewsProps {
    news: News[]
}

export const LastNews = ({news}: LastNewsProps) => {
    const theme = useMantineTheme()

    const gap = px(theme.spacing.md)
    const commonGap = (news.length - 1) * gap

    const isBigPhone = useMediaQuery('(max-width: 29.57em)');

    const Wrapper = isBigPhone ? OrangeBoxCompact : OrangeBox

    return (
        <Wrapper
            title="Последние новости"
            endHeader={
                <Anchor
                    fz="xs"
                    color="black"
                    component={NextLink}
                    href="/"
                >
                    Открыть все новости...
                </Anchor>
            }
        >
            <Flex justify="space-between" direction={isBigPhone ? 'column' : 'row'} gap="md" w="100%">
                {news.map((item) => (
                    <AspectRatio key={item.id} ratio={1} miw={isBigPhone ? 'calc(100% - 1px)' : `calc((100% - ${commonGap}px) / ${news.length})`}>
                        <ImageLinkWithDate
                            date={item.date}
                            label={item.label}
                            href={item.href}
                            src={item.imageSrc}
                        />
                    </AspectRatio>
                ))}
            </Flex>
        </Wrapper>
    )
}
