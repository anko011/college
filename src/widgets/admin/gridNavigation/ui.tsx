import {Divider, Flex, Grid, Stack, Title} from "@mantine/core";
import {LinkCard} from "@/share/client/components/admin";

type Link = {
    title: string
    url: string
}

export type Section = {
    title: string
    links: Link[]
}


type GridNavigationsProps = {
    sections: Section[]
}

const GRID_COLUMNS = 12

export const GridNavigation = ({sections}: GridNavigationsProps) => {
    const span = Math.ceil(GRID_COLUMNS / sections.length)
    return (
        <Grid>
            {sections.map((section) => (
                <Grid.Col key={section.title} span={span}>
                    <Flex direction="column">
                        <Title order={5}>{section.title}</Title>
                        <Divider my="xs"/>
                        {section.links.map(link => (
                            <LinkCard key={link.url} href={link.url} title={link.title}/>
                        ))}
                    </Flex>
                </Grid.Col>
            ))}
        </Grid>
    )
}

