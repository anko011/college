import {ReactNode} from "react";
import {Flex} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {AuthByCredentialForm} from "@/features/auth/";


export default function AdminLoginPage() {
    return (<AuthByCredentialForm/>)
}

AdminLoginPage.getLayout = function (page: ReactNode) {
    return (
        <>
            <Notifications autoClose={1500}/>
            <Flex
                justify="center"
                align="center"
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }}>
                {page}
            </Flex>
        </>
    )
}
