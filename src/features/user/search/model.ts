import {ParsedUrlQuery} from "querystring";
import {useForm} from "@mantine/form";
import {useAppRouter} from "@/share/client/hooks";
import {getSearchUserConfig} from "./config";
import {getBackendMappedQuery} from "@/share/lib/queryService";

const {
    searchUserLoginQueryKey,
    searchUserFirstNameQueryKey,
    searchUserSecondNameQueryKey,
    searchUserPatronymicNameQueryKey
} = getSearchUserConfig()

export const useQuerySearchUsers = () => {
    const router = useAppRouter()

    return {
        search(values: ReturnType<typeof useSearchUsersForm>['values']) {
            router.updateQueries({
                [searchUserFirstNameQueryKey]: values.firstName,
                [searchUserSecondNameQueryKey]: values.secondName,
                [searchUserPatronymicNameQueryKey]: values.patronymic,
                [searchUserLoginQueryKey]: values.login,
            })
        }
    }
}

export const useSearchUsersForm = () => useForm({
    initialValues: {
        login: '',
        firstName: '',
        secondName: '',
        patronymic: ''
    },
})

export const getSearchUsersQuery = (query: ParsedUrlQuery) => getBackendMappedQuery(
    [
        {backendKey: 'firstName', key: searchUserFirstNameQueryKey},
        {backendKey: 'secondName', key: searchUserSecondNameQueryKey},
        {backendKey: 'patronymic', key: searchUserPatronymicNameQueryKey},
        {backendKey: 'login', key: searchUserLoginQueryKey}
    ], query)

