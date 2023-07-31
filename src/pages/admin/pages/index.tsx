import {GetServerSidePropsContext, InferGetStaticPropsType} from "next";
import NextLink from 'next/link'
import {Anchor, Box, Group, Stack, Title} from "@mantine/core";
import {withAdminLayout} from "@/widgets/layout/adminLayout";
import {getAllCategories} from "@/entities/category/api";
import {CreateCategoryForm, DeleteCategoryButton, EditCategoryButton} from "@/features/category";
import {CategoryAccordion} from "@/entities/category";
import {PagesTable} from "@/entities/page";
import {DeletePageButton} from "@/features/page/delete-page/delete-page-button";
import {ResponseCookies} from "next/dist/compiled/@edge-runtime/cookies";
import {OutgoingMessage} from "http";
import {HeadersAdapter} from "next/dist/server/web/spec-extension/adapters/headers";


export async function getStaticProps(ctx: GetServerSidePropsContext) {
    const categories = await getAllCategories()
    const headers = new Headers()
    const cookie = new ResponseCookies(headers)

    cookie.set({name: 'test', value: 'owowowowow', path: '/', maxAge: 30})
    console.log('123123', cookie.toString())

    ctx.res.writeHead(200, {})

    return {props: {}}
}


function AdminPagePages({}: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <>
            {/*<Stack>*/}
            {/*    <Box>*/}
            {/*        <Title order={4}>Добавить категорию</Title>*/}
            {/*        <CreateCategoryForm/>*/}
            {/*    </Box>*/}

            {/*    <Box>*/}
            {/*        <Title order={4}>Категории</Title>*/}
            {/*        <CategoryAccordion*/}
            {/*            categories={categories}*/}
            {/*            categoryContent={(category) => (*/}
            {/*                <PagesTable*/}
            {/*                    pages={pages.filter(page => page.categoryId === category.id)}*/}
            {/*                    action={(page) => (*/}
            {/*                        <Group position="right">*/}
            {/*                            <DeletePageButton pageId={page.id}/>*/}
            {/*                        </Group>*/}
            {/*                    )}*/}
            {/*                    renderRow={(page) => (*/}
            {/*                        <>*/}
            {/*                            <td>*/}
            {/*                                <Anchor component={NextLink}*/}
            {/*                                        href={`/admin/page-editor/${page.id}`}>*/}
            {/*                                    {page.title}*/}
            {/*                                </Anchor>*/}
            {/*                            </td>*/}
            {/*                            <td>{page.slug}</td>*/}
            {/*                        </>*/}
            {/*                    )}*/}
            {/*                />*/}
            {/*            )}*/}
            {/*            action={(category) => (*/}
            {/*                <>*/}
            {/*                    <DeleteCategoryButton categoryId={category.id}/>*/}
            {/*                    <EditCategoryButton category={category}/>*/}
            {/*                </>*/}
            {/*            )}*/}
            {/*        />*/}
            {/*    </Box>*/}
            {/*</Stack>*/}
        </>
    )
}

export default withAdminLayout(AdminPagePages)
