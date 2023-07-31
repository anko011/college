import {withAdminLayout} from "@/widgets/layout/adminLayout";
import type {GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {getAllPages, getPageById} from "@/entities/page/api";
import {withFallback} from "../../../../share/client/hoc";

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const pages = await getAllPages()
    const paths = pages.map(page => ({params: {id: page.id.toString()}}))
    return {paths, fallback: true}
}

export async function getStaticProps({params}: GetStaticPropsContext) {

    if (!params || !('id' in params) || !params.id || Array.isArray(params.id)) {
        throw new Error('Не указан или некорректно указан ID для получения страницы в params')
    }

    const page = await getPageById(params.id)
    return {props: {page}}
}

function AdminPageEditorPage({page}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div>
            {JSON.stringify(page)}
        </div>
    )
}

export default withAdminLayout(withFallback(AdminPageEditorPage))
