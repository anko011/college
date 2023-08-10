import {Locale} from "@/share/lib/i18nService";

const RU_PERMISSION_DICTIONARY = {
    title: 'Право',
    permission: {
        id: 'Индентификатор',
        name: 'Название',
    },
    form: {
        transferList: {
            unselectedValues: 'Права',
            selectedValues: 'Выбранные права'
        }
    }
}

const mapper = {
    'ru': RU_PERMISSION_DICTIONARY
}

export const getPermissionDictionary = (locale: Locale) => {
    return mapper[locale]
}