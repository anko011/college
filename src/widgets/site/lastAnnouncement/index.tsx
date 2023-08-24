import {Card, ImageLink, withBeforeAdaptiveElement} from "@/share/client/components/site";
import classes from './styles.module.scss'
import {Link} from "@/share/client/components/site/link";
import {Title} from "@/share/client/components/site/title";
import {Text} from "@/share/client/components/site/text";

const CardWithBeforeElement = withBeforeAdaptiveElement(Card)

interface Announcement {

}

interface LasAnnouncementProps {
    announcement: Announcement
}


export const LastAnnouncement = () => {
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
                className={classes.image}
                src="/announcement/students.jpg"
                href="/"
                label={<Title size="xl">Список зачисления студентов</Title>}
            />
        </CardWithBeforeElement>
    )
}