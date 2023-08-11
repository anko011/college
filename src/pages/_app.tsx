import {NextPageWithLayout} from '@/widgets/admin/layout'
import {AppProps} from "next/app";
import {UserContext} from "@/entities/user/client";

interface AppPropsWithLayout extends AppProps {
    Component: NextPageWithLayout,
}

export default function Application({Component, pageProps: {user, ...pageProps}}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    return getLayout(
        <UserContext.Provider value={user}>
            <Component {...pageProps} />
        </UserContext.Provider>
    )
}
