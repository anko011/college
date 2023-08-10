export type Locale = 'ru'

const RU_COMMON_DICTIONARY = {
    buttons: {
        create: 'Создать',
        edit: 'Редактировать',
        cancel: 'Отменить',
        confirm: 'Подтвердить',
        search: 'Найти'
    },

    fields: {
        search: 'Поиск..',
        notFound: 'Ничего не найдено'
    },

    errors: {
        required: 'Обязательное поле'
    },

}

const mapper = {
    'ru': RU_COMMON_DICTIONARY
}

export function getCommonDictionary(locale: Locale) {
    return mapper[locale]
}