import classes from './styles.module.scss'
import {Logo} from "@/share/client/components";
import {IconMap2, IconMessages, IconPhoneIncoming} from "@tabler/icons-react";
import {Text} from "@/share/client/components/site/text";
import {ReactNode} from "react";
import {Link} from "@/share/client/components/site/link";
import cs from "classnames";

interface FooterLinkProps {
    href: string
    label: string
    icon?: ReactNode
}

const FooterLink = ({icon, label, href}: FooterLinkProps) => {
    return (
        <Link className={classes.link} href={href} underline>
            {icon}
            <Text>{label}</Text>
        </Link>
    )
}

interface FooterProps {
    className?: string;
}

export const Footer = ({className}: FooterProps) => {
    return (
        <footer className={cs(classes.root, className)}>
            <Logo/>

            <div className={classes.column}>
                <Text bold size="sm">Забайкальский горный коллежд им. М.И. Агошкова</Text>
                <FooterLink href="/" label="+7 (3022) 99-99-99" icon={<IconPhoneIncoming className={classes.svg}/>}/>
                <FooterLink href="/" label="college@mail.ru" icon={<IconMessages className={classes.svg}/>}/>
                <FooterLink href="/" label="672000, Забайкальский край, г. Чита, ул.Баргузинская, д. 41"
                            icon={<IconMap2 className={classes.svg}/>}/>
            </div>

            <div className={classes.column}>
                <FooterLink href="/" label="Аббитуриенту"/>
                <FooterLink href="/" label="Колледж"/>
                <FooterLink href="/" label="Образование"/>
            </div>

            <div className={classes.column}>
                <FooterLink href="/" label="Наука"/>
                <FooterLink href="/" label="Сотрудничество"/>
                <FooterLink href="/" label="Новости"/>
            </div>

            <div className={classes.column}>
                <FooterLink href="/" label="Контакты"/>
                <FooterLink href="/" label="Госуслуги"/>
            </div>
        </footer>
    )
}