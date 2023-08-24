import {News} from "@/entities/news";
import {Card, ImageLink, withBeforeAdaptiveElement} from "@/share/client/components/site";
import classes from './styles.module.scss'
import {CSSProperties} from "react";
import {Text} from "@/share/client/components/site/text";
import {Title} from "@/share/client/components/site/title";
import {Link} from "@/share/client/components/site/link";

const CardWithBeforeElement = withBeforeAdaptiveElement(Card)

interface LastNewsProps {
    news: News[]
}

export const LastNews = ({news}: LastNewsProps) => {

    return (
        <CardWithBeforeElement
            className={classes.root}
            beforeElement={<Link underline href="/"><Text>Открыть все новости...</Text></Link>}
            header={<Title size="md">Последние новости</Title>}
        >
            {news.map((item) => (
                <ImageLink
                    key={item.id}
                    className={classes.imageLink}
                    href={item.href}
                    src={item.imageSrc}
                    label={<Text size="lg">{item.label}</Text>}
                    style={{
                        ['--last-news-total-count']: news.length
                    } as CSSProperties}
                />
            ))}
        </CardWithBeforeElement>
    )
}
