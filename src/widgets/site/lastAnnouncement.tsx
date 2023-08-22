import {useMediaQuery} from "@mantine/hooks";

interface LastAnnouncementProps {
    date: Date
    label: string
    href: string
    imageSrc: string
}

export const LastAnnouncement = ({date, imageSrc, label, href}: LastAnnouncementProps) => {
    const isBigPhone = useMediaQuery('(max-width: 29.57em)');
    return (
        null
    )
}