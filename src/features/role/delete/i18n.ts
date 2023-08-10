import {Locale} from "@/share/lib/i18nService";

const LOCALE_RU = {
    notification: {
        title: 'Удаление роли',
        success: 'Роль успешно удалена',
        error: 'Не удалось удалить роль',
    },
    modal: {
        title: 'Удаление Роли',
        text: 'Вы действительно хотите удалить роль?',
    }
}

const mapper = {
    'ru': LOCALE_RU
}

export const getDeleteRoleDictionary = (locale: Locale) => {
    return mapper[locale]
}