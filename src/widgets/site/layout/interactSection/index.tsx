import {IconDashboard, IconEye} from "@tabler/icons-react";
import {AuthByCredentialsButton, LogoutButton} from "@/features/auth/client/ui/site";
import {useUser} from "@/entities/user/client";
import {UserInfo} from "@/entities/user/client/site";
import {ActionButton, Box, Divider} from "@/share/client/components/site";
import classes from './styles.module.scss'
import {useAppRouter} from "@/share/client/hooks";

const ButtonToAdminDashboard = () => {
    const router = useAppRouter()
    const handleClick = async () => {
        await router.push('/admin')
    }

    return (
        <ActionButton onClick={handleClick}>
            <IconDashboard/>
        </ActionButton>
    )
}

export const InteractSection = () => {
    const user = useUser()
    return (
        <Box className={classes.root}>
            <input placeholder="Поиск по сайту"/>
            {user && (
                <>
                    <Divider/>
                    <UserInfo user={user}/>
                    <Divider/>
                </>
            )}
            <div className={classes.buttons}>

                {user
                    ? (
                        <>
                            <LogoutButton/>
                            {user.role.systemName === 'ROLE_ADMIN' && <ButtonToAdminDashboard/>}
                        </>
                    )
                    : <AuthByCredentialsButton/>
                }


                <ActionButton>
                    <IconEye/>
                </ActionButton>
            </div>
        </Box>
    )
}