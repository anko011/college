import {Card, ImageLink, Link, Text, Title, withBeforeAdaptiveElement} from "@/share/client/components/site";
import {Announcement} from "@/entities/announcements";
import classes from './styles.module.scss'

const CardWithBeforeElement = withBeforeAdaptiveElement(Card)

interface LastAnnouncementProps {
    announcement: Announcement
}


export const LastAnnouncement = ({announcement}: LastAnnouncementProps) => {
    return (
        <CardWithBeforeElement
            className={classes.root}
            beforeElement={
                <Link underline href="/">
                    <Text>Открыть все объявления...</Text>
                </Link>
            }
            header={<Title size="md">Последнее объявление</Title>}
        >
            <ImageLink
                src={announcement.imageSrc}
                href={announcement.href}
                alt={announcement.alt}
                width={200}
                height={100}
                sizes="(max-width: 1024px) 50vw, (max-width: 768) 60vw, (max-width: 586) 83vw,60vw"
                priority
                label={<Title className={classes.label} size="xl">{announcement.title}</Title>}
            />
        </CardWithBeforeElement>
    )
}