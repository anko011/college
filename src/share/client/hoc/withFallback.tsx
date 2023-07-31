import {ComponentType} from "react";
import {useRouter} from "next/router";
import {Box, Loader} from "@mantine/core";

export function withFallback<T extends object>(Component: ComponentType<T>) {
    function ComponentWithFallback(props: T) {
        const router = useRouter()

        if (router.isFallback) {
            return (
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: 'center'
                }}>
                    <Loader/>
                </Box>
            )
        }

        return <Component {...props}/>
    }

    ComponentWithFallback.displayName = `${Component.displayName ?? Component.name} with fallback`

    return ComponentWithFallback
}
