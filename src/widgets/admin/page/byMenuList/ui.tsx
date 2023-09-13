import {Stack} from "@mantine/core";
import {Menu, MenuSide} from "@/widgets/admin/page/byMenuList/types";
import {MenuItem} from "./menuItem";

import {headerMenu, leftMenu, rightMenu} from '../../../../../mock'

const data: Menu[] = [
    {
        id: 1,
        title: 'Левое навигационное меню',
        menuSide: MenuSide.LEFT,
        items: leftMenu
    },
    {
        id: 2,
        title: 'Правое навигационное меню',
        menuSide: MenuSide.RIGHT,
        items: rightMenu
    },
    {
        id: 3,
        title: 'Верхнее навигационное меню',
        menuSide: MenuSide.HEADER,
        items: headerMenu
    }
]


export const PagesByMenuList = () => {
    return (
        <Stack spacing="xs">
            {data.map((item) => <MenuItem key={item.id} item={item}/>)}
        </Stack>
    )
}