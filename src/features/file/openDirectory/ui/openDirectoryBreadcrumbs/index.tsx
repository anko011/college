import {Breadcrumbs} from "@mantine/core";
import {OpenDirectoryLink} from "@/features/file";

interface OpenDirectoryBreadcrumbsProps {
    currentDirPath: string
}

export const OpenDirectoryBreadcrumbs = ({currentDirPath}: OpenDirectoryBreadcrumbsProps) => {
    const slices = currentDirPath?.split('/')?.filter(slice => slice !== '')
    const breadcrumbsLinks = slices?.map((slice, index) => {
        let path = '/'

        for (let i = 0; i <= index; i++) {
            const root = `${slices[i]}`
            path += `${root}/`
        }

        path = path.slice(0, path.length - 1)

        return (<OpenDirectoryLink key={path} name={slice} path={path}/>)
    })


    return (
        <Breadcrumbs>
            <OpenDirectoryLink path={''} name="#"/>
            {breadcrumbsLinks}
        </Breadcrumbs>
    )
}