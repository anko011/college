import {getBaseDictionary, Locale} from "@/share/lib/i18nService";
import {deepmerge} from "deepmerge-ts";

const LOCALE_RU = {
    roleTable: {
        header: {
            login: 'Название',
            permissions: 'Имя',
        }
    },

}

const mapping = {
    'ru': LOCALE_RU
}

export function getRoleTableDictionary(locale: Locale) {
    const baseDictionary = getBaseDictionary(locale)
    return deepmerge(baseDictionary, mapping[locale])
}