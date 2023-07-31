import {getBaseDictionary, Locale} from "@/share/lib/i18nService";
import {deepmerge} from "deepmerge-ts";

const LOCALE_RU = {
    userTable: {
        header: {
            firstName: 'Имя',
            secondName: 'Фамилия',
            patronymic: 'Отчество',
        }
    },

}

const mapping = {
    'ru': LOCALE_RU
}

export function getUserTableDictionary(locale: Locale) {
    const baseDictionary = getBaseDictionary(locale)
    return deepmerge(baseDictionary, mapping[locale])
}