import Head from 'next/head'
import NextLink from 'next/link'
import {fetchAllUsers} from "@/entities/user";

export default function Home() {
    return (
        <>
            <Head>
                <title>Горный колледж</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <h1>Сайт колледжа - Главная страница</h1>
                <NextLink href='/admin'>Перейти к главной странице админ панели</NextLink>

                <button onClick={async () => {
                    const response = await fetchAllUsers()
                    alert(response)
                }}>Click me
                </button>
            </main>
        </>
    )
}
