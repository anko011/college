import {appGetServerSideProps} from "@/widgets/appGetServerSideProps";
import {withAdminLayout} from "@/widgets/admin";


export const getServerSideProps = appGetServerSideProps(async ({user, req}) => {


    return {
        props: {user}
    }
})


export const AdminFilesPage = (
    {}: {}) => {

    return (
        <>
            <a href="https://oauth.yandex.ru/authorize?response_type=code&client_id=b2b0764ee7784ac995a008244dacd2f2">авторизоваться</a>
        </>
    )
}


export default withAdminLayout(AdminFilesPage)