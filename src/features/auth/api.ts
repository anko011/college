import {BackendResponse} from "@/share/api";

export async function signIn(login: string, password: string): Promise<BackendResponse> {
    const response = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({login, password})
    })

    return {
        status: response.status,
        data: response.json()
    }
}


export async function signOut(): Promise<BackendResponse> {
    const response = await fetch('/api/auth/logout/', {
        method: 'POST',
    })

    return {
        status: response.status,
        data: response.json()
    }
}
