import {Locale} from "@/share/lib/i18nService";


const LOCALE_RU = {
    notification: {
        title: 'Создание роли',
        success: 'Роль успешно создана',
        error: 'Не удалось создать роль'
    },
}

const mapper = {
    ru: LOCALE_RU
}

export function getCreateRoleDictionary(locale: Locale) {
    return mapper[locale]
}