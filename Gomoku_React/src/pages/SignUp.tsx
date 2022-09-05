import { useState, useRef, useEffect } from 'react'
import { Button, Input, Message } from '../components'
import users from '../data/user.json'
import style from './Login.module.css'

export default function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const usernameInput = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (usernameInput.current) {
            usernameInput.current.focus()
        }
    }, [])

    const handleSignUp = () => {
        if (users.find((u) => u.username === username)) {
            setErrorMessage(`Username ${username} has been taken`)
            return
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match')
            return
        } else {
            console.log({
                username,
                password,
            })
        }
    }

    return (
        <form
            className={style.container}
            onSubmit={(e) => {
                e.preventDefault()
                handleSignUp()
            }}>
            {errorMessage && <Message variant="error" message={errorMessage} />}
            <Input
                ref={usernameInput}
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value)
                }}
            />
            <Input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />

            <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value)
                }}
            />
            <Button
                type="submit"
                disabled={!username || !password || !confirmPassword}
            >
                Sign Up
            </Button>
        </form>

    )
}
