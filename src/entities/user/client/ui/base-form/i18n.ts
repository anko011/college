import {getCommonDictionary, Locale} from "@/share/lib/i18nService";
import {deepmerge} from "deepmerge-ts";


const LOCALE_RU = {
    form: {
        fields: {
            firstName: 'Имя',
            secondName: 'Фамилия',
            patronymic: 'Отчество',
            role: 'Роль',
            login: 'Логин',
            password: 'Пароль'
        },
    }
}

const localeMapping = {
    ru: LOCALE_RU
}

export function getBaseUserFormDictionary(locale: Locale) {
    const baseDictionary = getCommonDictionary(locale)
    return deepmerge(baseDictionary, localeMapping[locale])
}