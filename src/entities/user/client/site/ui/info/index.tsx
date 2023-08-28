import {Text} from "@/share/client/components/site";
import classes from './styles.module.scss'
import {UserWithRole} from "@/entities/user";

export const UserInfo = ({user}: { user: UserWithRole }) => {
    return (
        <>
            <div className={classes.root}>
                <Text>{`Вы вошли как: ${user.firstName} ${user.secondName}`}</Text>
                <Text>{`Ваша роль: ${user.role.name}`}</Text>
            </div>
        </>
    )
}
