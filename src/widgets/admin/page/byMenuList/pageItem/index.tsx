import {PageLink, PageLinkWithImage} from "@/entities/pages";
import {PageRow} from "@/entities/pages/client";
import {Group} from "@mantine/core";
import {DeletePageButton, EditPageButton} from "@/features/pages";

export const PageItem = ({item}: { item: PageLink | PageLinkWithImage }) => {
    return (
        <PageRow label={item.title} before={(
            <Group>
                <EditPageButton/>
                <DeletePageButton/>
            </Group>
        )}/>
    )
}