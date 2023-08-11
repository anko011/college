import {Locale} from "@/share/lib/i18nService";

const RU_DICTIONARY = {
    title: 'Быстрые ссылки'
}

const mapper = {
    'ru': RU_DICTIONARY
}

export const getGridNavigationDictionary = (locale: Locale) => {
    return mapper[locale]
}