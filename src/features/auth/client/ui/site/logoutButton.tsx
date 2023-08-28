import {IconLogout} from "@tabler/icons-react";
import {ActionButton} from "@/share/client/components/site";
import {signOut} from "@/features/auth";
import {useAppRouter} from "@/share/client/hooks";

export const LogoutButton = () => {
    const router = useAppRouter()
    const handleClick = async () => {
        await signOut()
        router.reload()
    }

    return <ActionButton onClick={handleClick}><IconLogout/></ActionButton>
}
