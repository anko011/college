import {getCommonDictionary, Locale} from "@/share/lib/i18nService";
import {deepmerge} from "deepmerge-ts";


const LOCALE_RU = {
    notification: {
        title: 'Создание пользователя',
        success: 'Пользователь успешно создан',
        error: 'Не удалось создать пользователя'
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
            confirm: 'Создать'
        }
    }
}

const localeMapping = {
    ru: LOCALE_RU
}

export function getUserCreateFeatureDictionary(locale: Locale) {
    const baseDictionary = getCommonDictionary(locale)
    return deepmerge(baseDictionary, localeMapping[locale])
}