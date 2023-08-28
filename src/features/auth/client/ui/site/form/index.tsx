import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {Button, Loader, Overlay, Text} from '@/share/client/components/site'
import classes from './styles.module.scss'
import {signIn} from "@/features/auth";
import {useAppRouter} from "@/share/client/hooks";

export const AuthByCredentialsForm = () => {
    const loginRef = useRef<HTMLInputElement>(null)
    const router = useAppRouter()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const [loginError, setLoginError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (loginRef.current) loginRef.current.focus()
    }, [])

    const resetValues = () => {
        setLogin('')
        setPassword('')
    }

    const resetErrors = () => {
        setLoginError('')
        setPasswordError('')
    }

    const handleChangeInput = (dispatcher: (...args: any) => any) => (e: ChangeEvent<HTMLInputElement>) => {
        dispatcher(e.target.value)
    }

    const isEmpty = (value: string) => value.length === 0

    const isValidData = () => {
        if (!isEmpty(login) && !isEmpty(password)) return true

        if (isEmpty(login)) setLoginError('Обязательное поле')
        if (isEmpty(password)) setPasswordError('Обязательное поле')

        return false
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (isValidData()) {
            resetErrors()
            setIsLoading(true)
            const response = await signIn(login, password)
            alert(response.status)
            setIsLoading(false)
            router.reload()
        }
        resetValues()
    }


    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            {isLoading && <Overlay><Loader/></Overlay>}
            <label className={classes.label}>
                <Text bold size="sm">Логин</Text>
                <input ref={loginRef} placeholder="Введите логин" value={login} onChange={handleChangeInput(setLogin)}/>
                {loginError && <Text className={classes.error}>{loginError}</Text>}
            </label>
            <label className={classes.label}>
                <Text bold size="sm">Пароль</Text>
                <input placeholder="Введите пароль" value={password} onChange={handleChangeInput(setPassword)}/>
                {passwordError && <Text className={classes.error}>{passwordError}</Text>}
            </label>
            <Button className={classes.button} type="submit">
                <Text size="sm">Войти</Text>
            </Button>
        </form>
    )
}