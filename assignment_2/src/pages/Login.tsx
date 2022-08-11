import React from 'react'
import { useState } from 'react'
import { Button, Input } from '../components'
import style from './Login.module.css'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <form className={style.container}>
            <Input name="username" placeholder="Username" value="" />
            <Input name="password" type="password" placeholder="Password" value="" />
            <Button type="submit">Login</Button>
        </form>
    )
}