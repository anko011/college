import {getBaseDictionary, Locale} from "@/share/lib/i18nService";
import {deepmerge} from "deepmerge-ts";

const LOCALE_RU = {
    form: {
        fields: {
            name: 'Название роли',
            permissions: {
                title: 'Права',
                selectedTitle: 'Выбранные права',
                searchField: 'Поиск...',
                notFound: 'Ничего не найдено'
            }
        },
    }
}

const localeMapping = {
    ru: LOCALE_RU
}

export function getBaseRoleFormDictionary(locale: Locale) {
    const baseDictionary = getBaseDictionary(locale)
    return deepmerge(baseDictionary, localeMapping[locale])
}