import { createContext } from "react";
import { User } from '../types'

type UserContextType = {
    user?: User
    username: String | undefined
    login: (username: string, password: string) => Promise<true | string>
    signup: (username: string, password: string) => Promise<true | string>
    logout: () => void
}

const UserContext = createContext<UserContextType>({} as UserContextType)
export default UserContext