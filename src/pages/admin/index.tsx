import {Text} from '@mantine/core'
import {withAdminLayout} from "@/widgets/layout/adminLayout";
import type {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";

export async function getServerSideProps({req, res}: GetServerSidePropsContext) {
    return {
        props: {
            user: null,
        }
    }
}

function AdminHomePage({user}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <Text>Admin home page</Text>
        </>
    )
}


export default withAdminLayout(AdminHomePage)

