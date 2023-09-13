import {createContext, useContext} from "react";
import {Menu, MenuSide} from "@/widgets/admin/page/byMenuList/types";
import {headerMenu, leftMenu} from "../../../../../mock";

interface MenuContext {
    HEADER: Menu
    LEFT: Menu
    RIGHT: Menu
}

const MenuContext = createContext<MenuContext>({
    HEADER: {
        id: 1,
        items: headerMenu,
        menuSide: MenuSide.HEADER,
        title: 'Верхнее навигационное меню0'
    },
    LEFT: {
        id: 2,
        items: leftMenu,
        menuSide: MenuSide.LEFT,
        title: 'Левое навигационное меню'
    },
    RIGHT: {
        id: 3,
        items: leftMenu,
        menuSide: MenuSide.LEFT,
        title: 'Правое навигационное меню'
    }
})

export const useMenuContext = () => {
    return useContext(MenuContext)
}