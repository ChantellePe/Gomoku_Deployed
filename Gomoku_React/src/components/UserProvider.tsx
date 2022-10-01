import { User, Credential } from '../types'
import { UserContext } from '../context'
import { useLocalStorage } from '../hooks'
import { post, setToken } from '../utils/http'

type UserProviderProps = {
    children: React.ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useLocalStorage<User | undefined>('user', undefined)
    const [username, setUsername] = useLocalStorage<string | undefined>("", undefined)
    if (user) {
        setToken(user.token)
    }

    const login = async (username: string, password: string) => {
        try {
            const user = await post<Credential, User>('/api/login', {
                username,
                password,
            })
            setUser(user)
            setUsername(username)
            setToken(user.token)
            return true
        } catch (error) {
            if (error instanceof Error) {
                return error.message
            }
            return 'Unable to login at this moment, please try again'
        }
    }

    const signup = async (username: string, password: string) => {
        try {
            const user = await post<Credential, User>('/api/signup', {
                username,
                password,
            })
            setUser(user)
            setUsername(username)
            setToken(user.token)
            return true
        } catch (error) {
            if (error instanceof Error) {
                return error.message
            }
            return 'Unable to login at this moment, please try again'
        }
    }

    const logout = () => {
        setUser(undefined)
        setToken('')
    }

    return (
        <UserContext.Provider value={{ user, username, login, signup, logout }}>
            {children}
        </UserContext.Provider>
    )
}