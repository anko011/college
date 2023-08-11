import {Locale} from "@/share/lib/i18nService";


const RU_DICTIONARY = {
    title: 'Создание пользователя',
    notification: {
        title: 'Создание пользователя',
        success: 'Пользователь успешно создан',
        error: 'Не удалось создать пользователя'
    },
}

const mapper = {
    ru: RU_DICTIONARY
}

export function getCreateUserDictionary(locale: Locale) {
    return mapper[locale]
}