import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {withAdminLayout} from "@/widgets/layout";
import {UserCreateWidget, UserListWidget} from "@/widgets/user";
import {getAllUsers} from "@/entities/user";
import {getAllRoles} from "@/entities/role";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const users = await getAllUsers(ctx)
    const roles = await getAllRoles(ctx)

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
