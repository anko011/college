import {Locale} from "@/share/lib/i18nService";

const RU_DICTIONARY = {
    title: 'Список пользователей',

}

const mapper = {
    'ru': RU_DICTIONARY
}

export const getUsersListDictionary = (locale: Locale) => mapper[locale]