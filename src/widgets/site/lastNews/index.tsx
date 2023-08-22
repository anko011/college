import {News} from "@/entities/news";
import {Card, ImageLink} from "@/share/client/components/site";
import classes from './styles.module.scss'
import NextLink from "next/link";
import {CSSProperties} from "react";

interface LastNewsProps {
    news: News[]
}

export const LastNews = ({news}: LastNewsProps) => {

    return (
        <Card
            className={classes.root}
            header={(
                <>
                    <h3>Последние новости</h3>
                    <NextLink className={classes.headerLink} href="/">Открыть все новости...</NextLink>
                </>
            )}
            footer={<NextLink className={classes.footerLink} href="/">Открыть все новости...</NextLink>}
        >
            {news.map((item) => (
                <ImageLink
                    key={item.id}
                    className={classes.imageLink}
                    href={item.href}
                    src={item.imageSrc}
                    label={<span>{item.label}</span>}
                    style={{
                        ['--last-news-total-count']: news.length
                    } as CSSProperties}
                />
            ))}
        </Card>
    )
}
