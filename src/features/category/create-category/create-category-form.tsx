import {createCategory} from "@/entities/category/api";
import {CategoryFieldsForm} from "../../../entities/category/client/ui";
import {Button} from "@mantine/core";
import {useHTTPNotify} from "../../../share/client/hooks";
import {Category} from "@/entities/category/types";

export function CreateCategoryForm() {
    const notification = useHTTPNotify(
        'Создание категории',
        'Категория успешно создана',
        'Не удалось создать категорию'
    )

    const handleSubmit = async (values: Omit<Category, 'id'>) => {
        const status = await createCategory(values)
        notification(status)
    }

    return (
        <CategoryFieldsForm
            onSubmit={handleSubmit}
            action={<Button sx={{alignSelf: 'end'}} type="submit" color={"green"}>Добавить</Button>}
        />
    )
}
