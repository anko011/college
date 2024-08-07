//@X
import {getUsersPageConfig} from "@/pages/admin/users";
import {getRolesPageConfig} from "@/pages/admin/roles";

import {
    getRolesListDictionary,
    getUsersListDictionary,
    GridNavigation,
    Section,
    withAdminLayout
} from "@/widgets/admin";

import {getCreateUserDictionary} from "@/features/user/create";
import {getCreateRoleDictionary} from "@/features/role/create";

import {getUserDictionary} from "@/entities/user";
import {getRoleDictionary} from "@/entities/role";
import {getGridNavigationDictionary} from "@/widgets/admin/gridNavigation/i18n";
import {appGetServerSideProps} from "@/widgets/appGetServerSideProps";

//@X
const usersPageConfig = getUsersPageConfig()
const rolesPageConfig = getRolesPageConfig()

const userDictionary = getUserDictionary('ru')
const usersListDictionary = getUsersListDictionary('ru')
const createUserDictionary = getCreateUserDictionary('ru')

const roleDictionary = getRoleDictionary('ru')
const rolesListDictionary = getRolesListDictionary('ru')
const createRoleDictionary = getCreateRoleDictionary('ru')

const gridNavigationDictionary = getGridNavigationDictionary('ru')

const sections: Section[] = [
    {
        title: userDictionary.title, links: [
            {
                title: createUserDictionary.title,
                url: `/admin/users?${usersPageConfig.tabsQueryKey}=${usersPageConfig.createUserQueryKey}`
            },
            {
                title: usersListDictionary.title,
                url: `/admin/users?${usersPageConfig.tabsQueryKey}=${usersPageConfig.listUsersQueryKey}`
            }
        ]
    },
    {
        title: roleDictionary.title, links: [
            {
                title: createRoleDictionary.title,
                url: `/admin/roles?${rolesPageConfig.tabsQueryKey}=${rolesPageConfig.createRoleQueryKey}`
            },
            {
                title: rolesListDictionary.title,
                url: `/admin/roles?${rolesPageConfig.tabsQueryKey}=${rolesPageConfig.listRolesQueryKey}`
            }
        ]
    }
]

export const getServerSideProps = appGetServerSideProps(async ({user}) => {
    return {
        props: {user}
    }
})

function AdminHomePage() {
    return (
        <>
            <GridNavigation sections={sections}/>
        </>
    )
}


export default withAdminLayout(AdminHomePage)

