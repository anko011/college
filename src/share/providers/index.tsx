import {MantineProvider as LibMantineProvider} from "@mantine/core";
import {ModalsProvider} from "@mantine/modals";
import {ReactNode} from "react";
import {Notifications} from "@mantine/notifications";


export function MantineProvider({children}: { children: ReactNode }) {
    return (
        <LibMantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                colorScheme: 'light',
            }}
        >
            <ModalsProvider>
                <Notifications autoClose={3000}/>
                {children}
            </ModalsProvider>
        </LibMantineProvider>
    )
}
