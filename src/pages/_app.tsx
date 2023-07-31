import {NextPageWithLayout} from '@/widgets/layout'
import {AppProps} from "next/app";
import {SessionContext} from "@/share/lib/sessionService";

interface AppPropsWithLayout extends AppProps {
    Component: NextPageWithLayout,
}


export default function App({Component, pageProps: {session, ...pageProps}}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    return getLayout(
        <SessionContext.Provider value={session}>
            <Component {...pageProps} />
        </SessionContext.Provider>
    )
}

