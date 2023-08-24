import {appGetServerSideProps} from "@/widgets/appGetServerSideProps";
import {withAdminLayout} from "@/widgets/admin";
import {getBackendHTTPConfig} from "@/share/lib/apiService";
import {withAuthHeader} from "@/share/lib/authService";
import {useUser} from "@/entities/user/client";


const {origin} = getBackendHTTPConfig()

export const getServerSideProps = appGetServerSideProps(async ({user, req}) => {
    const response = await fetch(`${origin}/yandex-disk/is-synchronized/${user?.id}`, withAuthHeader({
        method: 'GET'
    }, req))

    const result = await response.text()
    const isYandexSync = result === 'true'

    return {
        props: {user, isYandexSync}
    }
})


export const AdminFilesPage = ({isYandexSync}: { isYandexSync: boolean }) => {
    const user = useUser()
    return (
        <>
            {isYandexSync ? 'Аккаунт совпадает с зарегистрированным в Яндекс' : 'Аккаунт НЕ совпадает с зарегистрированным в Яндекс'}
            <a href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=b2b0764ee7784ac995a008244dacd2f2&force_confirm=yes&state=${user?.id}`}>авторизоваться</a>
        </>
    )
}


export default withAdminLayout(AdminFilesPage)