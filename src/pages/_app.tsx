import {NextPageWithLayout} from '@/widgets/layout'
import {AppProps} from "next/app";

interface AppPropsWithLayout extends AppProps {
    Component: NextPageWithLayout,
}

export default function Application({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    return getLayout(
        <Component {...pageProps} />
    )
}
