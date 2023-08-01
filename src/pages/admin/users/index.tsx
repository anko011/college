import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {withAdminLayout} from "@/widgets/layout";
import {UserCreateWidget, UserListWidget} from "@/widgets/user";
import {fetchAllUsers} from "@/entities/user";
import {fetchAllRoles} from "@/entities/role";

export async function getServerSideProps({req}: GetServerSidePropsContext) {
    const users = await fetchAllUsers(req)
    if ('message' in users) throw new Error(users.message)

    const roles = await fetchAllRoles(req)

    return {
        props: {users, roles}
    }
}

function AdminUsersPage({users, roles}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <UserCreateWidget roles={roles}/>
            <UserListWidget users={users} roles={roles}/>
        </>
    )

}

export default withAdminLayout(AdminUsersPage)
