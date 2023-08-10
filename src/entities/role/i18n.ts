import {Locale} from "@/share/lib/i18nService";

const RU_ROLE_DICTIONARY = {
    title: 'Роль',
    role: {
        id: 'Индентификатор',
        name: 'Название',
    },
}

const mapper = {
    'ru': RU_ROLE_DICTIONARY
}

export const getRoleDictionary = (locale: Locale) => {
    return mapper[locale]
}