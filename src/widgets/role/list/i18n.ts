import {Locale} from "@/share/lib/i18nService";

const RU_DICTIONARY = {
    table: {
        permissions: 'Права',
        control: 'Управление'
    }
}

const mapper = {
    'ru': RU_DICTIONARY
}

export const getRolesListDictionary = (locale: Locale) => mapper[locale]