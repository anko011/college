import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {withAdminLayout} from "@/widgets/layout";
import {UserCreateWidget, UserListWidget} from "@/widgets/user";
import {fetchUsers, getUsersPageFromQuery} from "@/entities/user";
import {fetchRoles} from "@/entities/role";
import {parseResponseOrError} from "@/share/api";


export async function getServerSideProps({req, query}: GetServerSidePropsContext) {
    const usersPage = getUsersPageFromQuery(query)

    const users = await parseResponseOrError(fetchUsers(usersPage, req))
    const roles = await parseResponseOrError(fetchRoles(0, req))

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
