import {Anchor, Box, createStyles, Stack, Text} from "@mantine/core";
import NextLink from "next/link";

interface ImageLinkWithDateProps {
    date: Date
    label: string
    href: string
    src: string
}

const useStyles = createStyles((theme, params: { src: string }) => ({
    root: {
        position: 'absolute',
        top: 0, bottom: 0,
        left: 0, right: 0,
        background: `no-repeat url("${params.src}")`,
        backgroundSize: 'cover',
        backgroundPositionY: '50%',
        paddingLeft: theme.spacing.xl
    },
    label: {
        background: theme.colors.peach[3],
        display: 'inline-flex',
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        right: '2%',
        gap: 0,
        padding: `${theme.spacing.xl} ${theme.spacing.xs}`,
        borderBottomLeftRadius: theme.radius.xl,
        borderBottomRightRadius: theme.radius.xl,
    },
    link: {
        marginRight: 'auto',
        position: 'relative',
        zIndex: 1,
        fontWeight: 600,
        fontSize: theme.fontSizes.xl,
        color: theme.white,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(-45deg, rgba(0,0,0,0.1) 40%, rgba(255,255,255,0.2) 50%, rgba(0,0,0,0.1) 60%)',
        backgroundSize: '150% 150%',
        backgroundPosition: '200%',
        transition: 'background-position 500ms ease',
        '&:hover': {
            backgroundPosition: '-100%'
        }
    }
}))

export const ImageLinkWithDate = (
    {
        date,
        href,
        label,
        src,
    }: ImageLinkWithDateProps) => {

    const day = date.getDate()
    const month = Intl.DateTimeFormat('ru', {month: 'long'}).format(date)
    const firstCharUpperCase = month.charAt(0).toUpperCase() + month.slice(1)
    const {classes} = useStyles({src})

    return (
        <Anchor underline={false} component={NextLink} href={href} className={classes.root}>
            <Box className={classes.overlay}/>
            <Text className={classes.link}>{label.toUpperCase()}</Text>
            <Stack className={classes.label}>
                <Text fz="lg" color="white" fw={600}>{day}</Text>
                <Text fz="xs" color="white" fw={600}>{firstCharUpperCase}</Text>
            </Stack>
        </Anchor>
    )
}