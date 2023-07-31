import {Checkbox, Input, Select, Stack, TextInput, Transition} from "@mantine/core";
import {isNotEmpty, useForm} from "@mantine/form";
import {ReactNode} from "react";
import {Category} from "@/entities/category/types";


interface CategoryFieldsFormProps {
    category?: Category
    action?: ReactNode

    onSubmit?(value: Omit<Category, 'id'>): void
}

export function CategoryFieldsForm(
    {
        category,
        action,
        onSubmit
    }: CategoryFieldsFormProps) {

    const form = useForm<Omit<Category, 'id'> & { isShowInSiteMenu: boolean }>({
        initialValues: {
            title: category?.title ?? '',
            slug: category?.slug ?? '',
            isShowInSiteMenu: Boolean(category?.menuPosition),
            menuPosition: category?.menuPosition ?? null
        },
        validate:
            {
                title: isNotEmpty('Поле не может быть пустым'),
                slug: (value) => new RegExp('^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$').test(value) ? null : 'Неподходящий формат slug',
            }
    })

    const handleSubmit = (values: typeof form.values) => {
        const data: Omit<Category, 'id'> = {
            title: values.title,
            menuPosition: values.isShowInSiteMenu ? values.menuPosition : null,
            slug: values.slug
        }

        onSubmit?.(data)
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)} {...form.getInputProps}>
            <Stack>
                <Input.Wrapper label="Заголовок категории" required>
                    <TextInput {...form.getInputProps('title')}/>
                </Input.Wrapper>

                <Input.Wrapper label="Slug категории" required>
                    <TextInput {...form.getInputProps('slug')}/>
                </Input.Wrapper>

                <Checkbox label="Отображать в меню?"
                          defaultChecked={form.values.isShowInSiteMenu} {...form.getInputProps('isShowInSiteMenu')}
                />

                <Transition transition="scale" mounted={form.values.isShowInSiteMenu}>
                    {(styles) => (
                        <Select
                            style={styles}
                            label="Выберите меню"
                            data={[
                                {label: 'Слева', value: 'LEFT'},
                                {label: 'Справа', value: 'RIGHT'},
                                {label: 'Сверху', value: 'TOP'},
                            ]}
                            {...form.getInputProps('menuPosition')}
                        />
                    )}
                </Transition>

                {action}
            </Stack>
        </form>
    )
}
