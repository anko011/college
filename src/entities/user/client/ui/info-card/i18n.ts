import {Locale} from "@/share/lib/i18nService";

const RU_DICTIONARY = {
    youAreLoggedInAs: 'Вы вошли как'
}

const mapper = {
    'ru': RU_DICTIONARY
}

export const getUserInfoCardDictionary = (locale: Locale) => mapper[locale]