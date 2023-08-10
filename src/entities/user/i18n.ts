import {Locale} from "@/share/lib/i18nService";


const RU_USER_DICTIONARY = {
    title: 'Пользователь',
    user: {
        firstName: 'Имя',
        secondName: 'Фамилия',
        patronymic: 'Отчество',
        role: 'Роль',
        login: 'Логин',
        password: 'Пароль'
    }
}

const mapper = {
    'ru': RU_USER_DICTIONARY
}

export const getUserDictionary = (locale: Locale) => {
    return mapper[locale]
}