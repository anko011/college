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

        </>
    )
}


export default withAdminLayout(AdminFilesPage)