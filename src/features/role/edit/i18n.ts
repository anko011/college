import {getBaseDictionary, Locale} from "@/share/lib/i18nService";
import {deepmerge} from "deepmerge-ts";


const LOCALE_RU = {
    modal: {
        title: 'Редактирование роли'
    },
    notification: {
        title: 'Редактирование роли',
        success: 'Роль успешно обновлена',
        error: 'Не удалось обновить роль'
    },
    form: {
        buttons: {
            confirm: 'Редактировать',
            cancel: 'Отменить'
        }
    }
}

const localeMapping = {
    ru: LOCALE_RU
}

export function getRoleEditFeatureDictionary(locale: Locale) {
    const baseDictionary = getBaseDictionary(locale)
    return deepmerge(baseDictionary, localeMapping[locale])
}