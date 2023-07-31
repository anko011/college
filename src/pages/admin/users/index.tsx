import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {withAdminLayout} from "@/widgets/layout";
import {UserCreateWidget, UserListWidget} from "@/widgets/user";
import {fetchAllUsers} from "@/entities/user";
import {getAllRoles} from "@/entities/role";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const users = await fetchAllUsers(ctx.req)
    // const roles = await getAllRoles(ctx)

    return {
        props: {users}
    }
}

function AdminUsersPage({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            {JSON.stringify(users)}
            {/*<UserCreateWidget roles={roles}/>*/}
            {/*<UserListWidget users={users} roles={roles}/>*/}
        </>
    )

}

export default withAdminLayout(AdminUsersPage)
