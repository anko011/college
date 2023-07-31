export async function signIn(login: string, password: string) {
    return await fetch('/api/auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({login, password})
    })
}


export async function signOut() {
    return await fetch('/api/auth/logout/', {
        method: 'POST',
    })
}
