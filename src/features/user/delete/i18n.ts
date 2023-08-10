import {Locale} from "@/share/lib/i18nService";

const RU_DICTIONARY = {
    notification: {
        title: 'Удаление пользователя',
        success: 'Пользователь успешно удален',
        error: 'Не удалось удалить пользователя',
    },
    modal: {
        title: 'Удаление пользователя',
    }
}

const mapper = {
    'ru': RU_DICTIONARY
}

export const getDeleteUserDictionary = (locale: Locale) => {
    return mapper[locale]
}