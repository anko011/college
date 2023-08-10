import {Locale} from "@/share/lib/i18nService";


const RU_DICTIONARY = {
    notification: {
        title: 'Создание пользователя',
        success: 'Пользователь успешно создан',
        error: 'Не удалось создать пользователя'
    },
}

const mapper = {
    ru: RU_DICTIONARY
}

export function getUserCreateDictionary(locale: Locale) {
    return mapper[locale]
}