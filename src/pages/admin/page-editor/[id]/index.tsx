import {withAdminLayout} from "@/widgets/layout/adminLayout";
import type {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {withFallback} from "@/share/client/hoc";

// export async function getStaticPaths(): Promise<GetStaticPathsResult> {
//     const pages = await getAllPages()
//     const paths = pages.map(page => ({params: {id: page.id.toString()}}))
//     return {paths, fallback: true}
// }

export async function getStaticProps({params}: GetStaticPropsContext) {

    if (!params || !('id' in params) || !params.id || Array.isArray(params.id)) {
        throw new Error('Не указан или некорректно указан ID для получения страницы в params')
    }

    return {props: {}}
}

function AdminPageEditorPage({}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div>
            Page editor
        </div>
    )
}

export default withAdminLayout(withFallback(AdminPageEditorPage))
