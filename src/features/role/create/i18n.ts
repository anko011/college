import {getBaseDictionary, Locale} from "@/share/lib/i18nService";
import {deepmerge} from "deepmerge-ts";


const LOCALE_RU = {
    notification: {
        title: 'Создание роли',
        success: 'Роль успешно создана',
        error: 'Не удалось создать роль'
    },
    form: {
        buttons: {
            confirm: 'Создать'
        }
    }
}

const localeMapping = {
    ru: LOCALE_RU
}

export function getRoleCreateFeatureDictionary(locale: Locale) {
    const baseDictionary = getBaseDictionary(locale)
    return deepmerge(baseDictionary, localeMapping[locale])
}