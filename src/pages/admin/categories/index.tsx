import {type NextPageWithLayout, withAdminLayout} from "@/widgets/layout";

const AdminCategoriesPage: NextPageWithLayout = () => {
    return (
        <>
            <div>Categories page</div>
        </>
    )
}
export default withAdminLayout(AdminCategoriesPage)
