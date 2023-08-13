import Link from "next/link";
import {Flex, Text} from "@mantine/core";
import {Logo} from "@/share/client/components";

import {useUser} from "../../hooks";
import {getUserInfoCardDictionary} from "./i18n";

const userInfoCardDictionary = getUserInfoCardDictionary('ru')

export const UserInfoCard = () => {
    const user = useUser()
    if (!user) return null

    return (
        <Flex justify="center" align="center" direction="column">
            <Link href="/admin">
                <Logo/>
            </Link>
            <Text size="sm">{userInfoCardDictionary.youAreLoggedInAs}</Text>
            <Text>{`${user.firstName} ${user.secondName}`}</Text>
        </Flex>
    )
}