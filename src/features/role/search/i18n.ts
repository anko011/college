import {getBaseDictionary, Locale} from "@/share/lib/i18nService";
import {deepmerge} from "deepmerge-ts";


const LOCALE_RU = {
    form: {
        fields: {
          search: {
              name: 'Название',
          }
        },
        buttons: {
            search: 'Найти'
        }
    }
}

const localeMapping = {
    ru: LOCALE_RU
}

export function getRoleSearchFeatureDictionary(locale: Locale) {
    const baseDictionary = getBaseDictionary(locale)
    return deepmerge(baseDictionary, localeMapping[locale])
}