import {withAdminLayout} from "@/widgets/admin";
import {appGetServerSideProps} from "@/widgets/appGetServerSideProps";
import {Box, Collapse, createStyles, Group, Text} from "@mantine/core";
import {useState} from "react";
import {IconCategory, IconFile} from "@tabler/icons-react";
import {PagesByMenuList} from "@/widgets/admin/page/byMenuList";

enum MenuSide {
    RIGHT = 'RIGHT',
    LEFT = 'LEFT',
    HEADER = 'HEADER'
}

interface Page {
    id: number
    slug: string
}

interface Category {
    id: number
    slug: string
    pages: Page[]
    subcategories?: Category[]
}

interface MenuItem {
    id: number
    pages: Page[]
    categories: Category[]
    menuSide: MenuSide.LEFT | MenuSide.HEADER
}

type MenuItemFlat = Omit<MenuItem, 'categories' | 'menuSide'> & {
    menuSide: MenuSide.RIGHT
}

type MenuData = Array<MenuItem | MenuItemFlat>

const data: MenuData = [
    {
        id: 1,
        pages: [
            {id: 1, slug: 'vk'},
            {id: 2, slug: 'schedule'},
            {id: 3, slug: 'contacts'},
            {id: 4, slug: 'clothes'},
        ],
        menuSide: MenuSide.RIGHT,
    },
    {
        id: 2,
        categories: [
            {
                id: 1,
                slug: 'college',
                pages: [
                    {id: 1, slug: 'istoria-zabgu'},
                    {id: 2, slug: 'shema-ypravlenia'},
                ],
                subcategories: [
                    {
                        id: 1,
                        slug: 'rukovodstvo',
                        pages: [
                            {id: 1, slug: 'zam-directora'},
                            {id: 2, slug: 'zam-directora'},
                        ],
                    }
                ]
            }
        ],
        pages: [
            {id: 1, slug: 'site-map'},
            {id: 2, slug: 'paper'},
        ],
        menuSide: MenuSide.LEFT
    },
    {
        id: 3,
        categories: [
            {
                id: 1,
                slug: 'abbiturienty',
                pages: [
                    {id: 1, slug: 'specialnosti'},
                    {id: 2, slug: 'postyplenia-2022'},
                    {id: 3, slug: 'proforientacia'},
                ],
                subcategories: [
                    {
                        id: 1,
                        slug: 'normativnie-documenti',
                        pages: [
                            {id: 1, slug: 'ystav'},
                            {id: 2, slug: 'other docs'},
                        ],
                        subcategories: [
                            {
                                id: 1,
                                slug: 'asdf',
                                pages: [
                                    {id: 1, slug: '123'},
                                    {id: 2, slug: '456'},
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        pages: [
            {id: 1, slug: 'test'},
            {id: 2, slug: 'testi2'},
        ],
        menuSide: MenuSide.HEADER
    }
]


export const getServerSideProps = appGetServerSideProps(async ({user}) => {
    return {
        props: {user}
    }
})


const Page = ({page}: { page: Page }) => {
    return (
        <Group>
            <IconFile/>
            <Text>
                {page.slug}
            </Text>
        </Group>
    )
}

const useCategoryStyles = createStyles((theme) => ({
    header: {
        cursor: 'pointer',
        '&:hover': {
            background: theme.colors.blue[0]
        }
    },
    content: {
        borderLeft: '1px solid black',
        paddingLeft: theme.spacing.xs,
    },
}))

const isPage = (obj: unknown): obj is Page => (
    typeof obj === 'object' && !!obj &&
    'id' in obj && typeof obj.id === 'number' &&
    'slug' in obj && typeof obj.slug === 'string'
)

const isCategory = (obj: unknown): obj is Category => {
    if (!(typeof obj === 'object' && !!obj &&
        'id' in obj && typeof obj.id === 'number' &&
        'slug' in obj && typeof obj.slug === 'string' &&
        'pages' in obj && Array.isArray(obj.pages) && obj.pages.every(isPage))) return false

    if ('subcategories' in obj) {
        return Array.isArray(obj.subcategories) && obj.subcategories.every(isCategory)
    }

    return true
}

const isMenuItemFlat = (obj: unknown): obj is MenuItemFlat => (
    typeof obj === 'object' && !!obj &&
    'id' in obj && typeof obj.id === 'number' &&
    'pages' in obj && Array.isArray(obj.pages) && obj.pages.every(isPage)
)

const isMenuItem = (obj: unknown): obj is MenuItem => (
    typeof obj === 'object' && !!obj &&
    'categories' in obj && Array.isArray(obj.categories) && obj.categories.every(isCategory)
)

const getTitleMenuSide = (side: MenuSide) => {
    const map: { [key in MenuSide]: string } = {
        [MenuSide.RIGHT]: 'Правое меню',
        [MenuSide.HEADER]: 'Верхнее меню',
        [MenuSide.LEFT]: 'Левое меню'
    }

    return map[side]
}

const Category = ({item}: { item: (MenuItem | MenuItemFlat) | Category }) => {
    const {classes} = useCategoryStyles()
    const [isShow, setIsShow] = useState(false)
    const handleClick = () => setIsShow((prev) => !prev)

    const title = isCategory(item) ? item.slug : getTitleMenuSide(item.menuSide)
    const categories = isMenuItem(item) ? item.categories : isCategory(item) ? (item.subcategories ?? []) : []
    return (
        <Box>
            <Group className={classes.header} onClick={handleClick}>
                <IconCategory/>
                <Text>
                    {title}
                </Text>
            </Group>
            <Collapse in={isShow}>
                <Box className={classes.content}>

                    {categories.map((category) => <Category key={category.id}
                                                            item={category}/>)}

                    {item.pages.map((page) => <Page key={page.id} page={page}/>)}
                </Box>
            </Collapse>
        </Box>
    )
}


const AdminPagesPage = () => {
    return (
        <>
            <PagesByMenuList/>
        </>
    )
}

export default withAdminLayout(AdminPagesPage)