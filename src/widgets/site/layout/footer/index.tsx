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
    underline?: boolean
}

const FooterLink = ({icon, label, href, underline = true}: FooterLinkProps) => {
    return (
        <Link className={classes.link} href={href} underline={underline}>
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
            <Logo className={classes.logo}/>

            <div className={classes.column}>
                <Text bold size="sm">Забайкальский горный коллежд им. М.И. Агошкова</Text>
                <FooterLink
                    href="/" label="+7 (3022) 99-99-99"
                    icon={<IconPhoneIncoming className={classes.svg}/>}
                    underline={false}
                />
                <FooterLink
                    href="/"
                    label="college@mail.ru"
                    icon={<IconMessages className={classes.svg}/>}
                    underline={false}
                />
                <FooterLink
                    href="/"
                    label="672000, Забайкальский край, г. Чита, ул.Баргузинская, д. 41"
                    icon={<IconMap2 className={classes.svg}/>}
                    underline={false}
                />
            </div>

            <div className={classes.column}>
                <Text size="sm" bold>Аббитуриенту</Text>
                <FooterLink href="/" label="Специальности"/>
                <FooterLink href="/" label="Нормативные документы"/>
                <FooterLink href="/" label="Поступления 2022"/>
                <FooterLink href="/" label="Профориентация"/>
            </div>

            <div className={classes.column}>
                <Text size="sm" bold>Научная деятельность</Text>
                <FooterLink href="/" label="РИП"/>
                <FooterLink href="/" label="Научно-профилактическая конференция"/>
                <FooterLink href="/" label="Вестник ЗабГК"/>
                <FooterLink href="/" label="Наставничество"/>
            </div>

            <div className={classes.column}>
                <Text size="sm" bold>Сторонние ресурсы</Text>
                <FooterLink href="/" label="Вконтакте"/>
                <FooterLink href="/" label="Госуслуги"/>
                <FooterLink href="/" label="ProCollege"/>
            </div>
        </footer>
    )
}