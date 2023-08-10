import {getCommonDictionary, Locale} from "@/share/lib/i18nService";
import {deepmerge} from "deepmerge-ts";


const LOCALE_RU = {
    modal: {
        title: 'Редактирование пользователя'
    },
    notification: {
        title: 'Редактирование пользователя',
        success: 'Пользователь успешно обновлен',
        error: 'Не удалось обновить пользователя'
    },
    form: {
        fields: {
            firstName: 'Имя',
            secondName: 'Фамилия',
            patronymic: 'Отчество',
            role: 'Роль',
            login: 'Логин',
            password: 'Пароль'
        },
        buttons: {
            confirm: 'Редактировать',
            cancel: 'Отменить'
        }
    }
}

const localeMapping = {
    ru: LOCALE_RU
}

export function getUserEditFeatureDictionary(locale: Locale) {
    const baseDictionary = getCommonDictionary(locale)
    return deepmerge(baseDictionary, localeMapping[locale])
}