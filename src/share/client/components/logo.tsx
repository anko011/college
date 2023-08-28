import Image from "next/image";
import {ComponentType} from "react";

type ComponentProps<T extends object> = T extends ComponentType<infer R> ? R : never

type LogoProps = Partial<ComponentProps<typeof Image>>

export const Logo = ({width = "100", height = "120", alt = "Логотип", src = '/logo.svg', ...props}: LogoProps) => {
    return (
        <Image src={src} width={width} height={height} alt={alt} {...props}/>
    )
}