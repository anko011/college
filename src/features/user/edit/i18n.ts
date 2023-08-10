import {Locale} from "@/share/lib/i18nService";


const RU_DICTIONARY = {
    modal: {
        title: 'Редактирование пользователя'
    },
    notification: {
        title: 'Редактирование пользователя',
        success: 'Пользователь успешно обновлен',
        error: 'Не удалось обновить пользователя'
    },
}

const mapper = {
    ru: RU_DICTIONARY
}

export function getUserEditDictionary(locale: Locale) {
    return mapper[locale]
}