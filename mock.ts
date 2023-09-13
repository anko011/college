import {PageLink, PageLinkWithImage} from "@/entities/pages";
import {Category} from "@/entities/categories";

export const leftMenu: (Category | PageLink)[] = [
    {
        id: 1,
        title: 'Сведения об образовательной организации',
        slug: 'education-info',
        items: [
            {
                id: 1,
                title: 'Основные сведения',
                slug: 'svedenia',
            },
            {
                id: 2,
                title: 'Структура и органы управления образовательной организацией',
                slug: '/'
            },
            {
                id: 3,
                title: 'Документы',
                slug: '/'
            },
            {
                id: 4,
                title: 'Образование',
                slug: 'education',
                items: [
                    {
                        id: 1,
                        title: 'Образование',
                        slug: 'education'
                    },
                    {
                        id: 2,
                        title: 'Целевая моель наставничества в образовательной организации',
                        slug: 'nastavnichestvo'
                    },
                ]
            },
            {
                id: 5,
                title: 'Образовательные стандарты',
                slug: 'standarti'
            },
            {
                id: 6,
                title: 'Руководство. Педагогический (научно-педагогический) состав',
                slug: 'rukovodstvo'
            },
            {
                id: 7,
                title: 'Материально-техническое обеспечение и оснащенность образовательного процесса',
                slug: 'obespechenie'
            },
            {
                id: 8,
                title: 'Стипендии и меры поддержки обучающихся',
                slug: '/'
            },
            {
                id: 9,
                title: 'Платные услуги',
                slug: '/'
            },
            {
                id: 10,
                title: 'Финансово-хозяйственная деятельность',
                slug: '/'
            },
            {
                id: 11,
                title: 'Вакантные места для приема (перевода) на 01.04.2023 г.',
                slug: '/'
            },
            {
                id: 12,
                title: 'Доступная среда',
                slug: '/'
            },
            {
                id: 13,
                title: 'Международное сотрудничество',
                slug: '/'
            }
        ]
    },
    {
        id: 2,
        title: 'Колледж',
        slug: 'college',
        items: [
            {
                id: 1,
                title: 'История ЗабГК',
                slug: '/'
            },
            {
                id: 2,
                title: 'Схема управления',
                slug: '/#'
            },
            {
                id: 3,
                title: 'Руководство',
                slug: 'rukovodstvo',
                items: [
                    {
                        id: 1,
                        title: 'Директор',
                        slug: '/#'
                    },
                    {
                        id: 2,
                        title: 'Зам. директора по УР',
                        slug: '/#'
                    },
                    {
                        id: 3,
                        title: 'Зам. директора по ЭР',
                        slug: '/#'
                    },
                    {
                        id: 4,
                        title: 'Зам. директора по ВР',
                        slug: '/#'
                    }
                ]
            },
            {
                id: 4,
                title: 'Отделения',
                slug: 'otdeleniya',
                items: [
                    {
                        id: 1,
                        title: 'Геолого-маркшейдерское отделение',
                        slug: '/'
                    },
                    {
                        id: 2,
                        title: 'Горное',
                        slug: '/'
                    },
                    {
                        id: 3,
                        title: 'Отделение информационных технологий и экономики',
                        slug: '/'
                    },
                    {
                        id: 4,
                        title: 'Заочное',
                        slug: '/'
                    }
                ]
            },
        ]
    },
    {
        id: 3,
        title: 'Противодействие коррупции',
        slug: '/#'
    },
    {
        id: 4,
        title: 'Газета "Горняцкая смена"',
        slug: '/#'
    },
    {
        id: 5,
        title: 'Газета "Горняцкая смена"',
        slug: 'gazeta',
        items: []
    },
    {
        id: 6,
        title: 'Научно-инновационная и методическая деятельность',
        slug: 'nayka',
        items: []
    },
    {
        id: 7,
        title: 'ИС "ProCollege"',
        slug: 'procollege',
        items: []
    },
    {
        id: 8,
        title: 'Сетевой город. Образование',
        slug: 'setevoi-gorod',
        items: []
    },
    {
        id: 9,
        title: 'Профессионалы - Заб. край',
        slug: 'professionaly',
        items: [],
    },
    {
        id: 10,
        title: 'Демонстрационный экзамен',
        slug: 'ekzamen',
        items: []
    },
    {
        id: 11,
        title: 'Охрана труда',
        slug: 'ohrana-truda',
    },
    {
        id: 12,
        title: 'Внутрення система оценки качества образования',
        slug: 'sistema-ocenki',
        items: []
    },
    {
        id: 13,
        title: 'Наставничество',
        slug: 'nastavnichestvo'
    },
    {
        id: 14,
        title: 'Карта сайта',
        slug: 'karta-saita'
    },
]
export const headerMenu: (Category | PageLink)[] = [

    {
        id: 1,
        title: 'Главная',
        slug: ''
    },
    {
        id: 2,
        title: 'Аббитуриенту',
        slug: 'abbiturienty',
        items: [
            {
                id: 1,
                title: 'Специальности',
                slug: ''
            },
            {
                id: 2,
                title: 'Нормативные документы',
                slug: 'normativnie-documenty',
                items: [
                    {
                        id: 1,
                        title: 'Устав',
                        slug: 'ystav',
                    },
                    {
                        id: 2,
                        title: 'Список уполномоченных лиц',
                        slug: 'spisok-lic',
                    }
                ]
            },
            {
                id: 3,
                title: 'Поступления 2022',
                slug: 'postyplenia'
            },
            {
                id: 4,
                title: 'Профориентация',
                slug: 'proforientacia'
            }
        ]
    },
    {
        id: 3,
        title: 'Студенту',
        slug: 'studenti',
        items: [
            {
                id: 1,
                title: 'Студенту очного отделения',
                slug: 'ochnoe'
            },
            {
                id: 2,
                title: 'Студенту заочного отделения',
                slug: 'zaochnoe'
            },
        ]
    },
    {
        id: 4,
        title: 'Выпускнику',
        slug: 'vipokusniku'
    },
    {
        id: 5,
        title: 'Часто задаваемые вопросы',
        slug: 'chavo'
    }
]
export const rightMenu: PageLinkWithImage[] = [
    {
        id: 1,
        title: 'Заявка справки об обучении',
        slug: '',
        imageSrc: '/rightMenu/document.jpg',
        imageAlt: 'Фоновое изображение пункта меню'
    },
    {
        id: 2,
        title: 'Расписание',
        slug: '',
        imageSrc: '/rightMenu/schedule.jpg',
        imageAlt: 'Фоновое изображение пункта меню'
    },
    {
        id: 3,
        title: 'Контакты',
        slug: '',
        imageSrc: '/rightMenu/contacts.jpg',
        imageAlt: 'Фоновое изображение пункта меню'
    },
    {
        id: 4,
        title: 'Корпаративная форма',
        slug: '',
        imageSrc: '/rightMenu/clothes.jpg',
        imageAlt: 'Фоновое изображение пункта меню'
    },
    {
        id: 5,
        title: 'Группа VK',
        slug: '',
        imageSrc: '/rightMenu/vk.jpg',
        imageAlt: 'Фоновое изображение пункта меню'
    }
]
