import {IconEye, IconLogin} from "@tabler/icons-react";
import {Box} from "@/share/client/components/site";
import classes from './styles.module.scss'

export const InteractSection = () => {
    return (
        <Box className={classes.root}>
            <input className={classes.searchInput} placeholder="Поиск по сайту"/>
            <button className={classes.loginButton}>
                <IconLogin/>
            </button>
            <button className={classes.eyeButton}>
                <IconEye/>
            </button>
        </Box>
    )
}