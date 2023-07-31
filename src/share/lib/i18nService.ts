export type Locale = 'ru'

const locale_ru = {
    form: {
        errors: {
            required: 'Обязательное поле'
        },
    },
    modal: {
        buttons: {
            confirm: 'Подтвердить',
            cancel: 'Отменить'
        }
    }
}

export function getBaseDictionary(locale: Locale) {
    if (locale === 'ru') {
        return locale_ru
    }

    return locale_ru
}