import {appGetServerSideProps} from "@/widgets/appGetServerSideProps";
import {withAdminLayout} from "@/widgets/admin";
import {useUser} from "@/entities/user/client";
import {getBackendHTTPConfig} from "@/share/lib/apiService";
import {withAuthHeader} from "@/share/lib/authService";


const {origin} = getBackendHTTPConfig()

export const getServerSideProps = appGetServerSideProps(async ({user, req}) => {

    const response = await fetch(`${origin}/yandex-disk/is-synchronized`, withAuthHeader({
        method: 'GET'
    }, req))

    const isYandexSync = (await response.text()) === 'true'

    const res = {
        status: '',

        userDetail: {

        }
    }

    return {
        props: {user, isYandexSync}
    }
})


export const AdminFilesPage = ({isYandexSync}: { isYandexSync: boolean }) => {
    return (
        <>ы
            {isYandexSync ? 'Жопка топ' : 'Жопка давн'}
            <a href="https://oauth.yandex.ru/authorize?response_type=code&client_id=b2b0764ee7784ac995a008244dacd2f2&force_confirm=yes">авторизоваться</a>
        </>
    )
}


export default withAdminLayout(AdminFilesPage)