import {Locale} from "@/share/lib/i18nService";


const LOCALE_RU = {
    modal: {
        title: 'Редактирование роли'
    },
    notification: {
        title: 'Редактирование роли',
        success: 'Роль успешно обновлена',
        error: 'Не удалось обновить роль'
    },
}

const mapper = {
    ru: LOCALE_RU
}

export function getRoleEditDictionary(locale: Locale) {
    return mapper[locale]
}