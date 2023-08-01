import {getBaseDictionary, Locale} from "@/share/lib/i18nService";
import {deepmerge} from "deepmerge-ts";

const LOCALE_RU = {
    notification: {
        title: 'Удаление пользователя',
        success: 'Пользователь успешно удален',
        error: 'Не удалось удалить пользователя',
    },
    modal: {
        title: 'Удаление пользователя',
        buttons: {
            cancel: 'Отмена',
            confirm: 'Удалить'
        }
    }
}

const matcher = {
    'ru': LOCALE_RU
}

export const getDeleteUserFeautureDictionary = (locale: Locale) => {
    const baseDictionary = getBaseDictionary(locale)
    return deepmerge(baseDictionary, matcher[locale])
}