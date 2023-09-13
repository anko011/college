import {fetcher} from "@/share/lib/apiService";

export async function signIn(login: string, password: string) {
    return await fetcher('/api/auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({login, password})
    })
}


export async function signOut() {
    return await fetcher('/api/auth/logout/', {
        method: 'POST',
    })
}
