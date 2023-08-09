import {getBaseDictionary, Locale} from "@/share/lib/i18nService";
import {deepmerge} from "deepmerge-ts";

const LOCALE_RU = {
    notification: {
        title: 'Удаление роли',
        success: 'Роль успешно удалена',
        error: 'Не удалось удалить роль',
    },
    modal: {
        title: 'Удаление Роли',
        text: 'Вы действительно хотите удалить роль?',
        buttons: {
            cancel: 'Отмена',
            confirm: 'Удалить'
        }
    }
}

const matcher = {
    'ru': LOCALE_RU
}

export const getDeleteRoleDictionary = (locale: Locale) => {
    const baseDictionary = getBaseDictionary(locale)
    return deepmerge(baseDictionary, matcher[locale])
}