import {News} from "@/entities/news";
import {Card, ImageLink, Link, Text, Title, withBeforeAdaptiveElement} from "@/share/client/components/site";
import {CSSProperties} from "react";
import classes from './styles.module.scss'

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
                    className={classes.newsItem}
                    href={item.href}
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    label={<Text className={classes.newsLabel} bold>{item.label}</Text>}
                    fill
                    sizes="(max-width: 586px) 80vw, 20vw"
                    style={{
                        ['--last-news-total-count']: news.length
                    } as CSSProperties}
                />
            ))}
        </CardWithBeforeElement>
    )
}
