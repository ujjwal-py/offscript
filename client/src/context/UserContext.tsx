import React, { useContext, useState, type ReactNode } from 'react'
import { createContext } from 'react'
import type { User } from '../types';
import { api } from '../Api';

type AuthBody = {
    user: User,
    login: () => Promise<void>,
    logout: () => Promise<void>
}

const userContext = createContext<AuthBody | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>({
        name: "",
        id: "",
        email: "",
        joined: ""
    });
    const login = async () => {
        try {
            const response = await api.get("/me");
            setUser(response.data);
        } catch (err) {
            console.log(err);
            setUser({
                name: "",
                id: "",
                email: "",
                joined: ""
            })
        }
    };
    const logout = async () => {
        try {
            await api.post("/logout");
        } catch (err) {
            console.log(err);
        } finally {
            setUser({
                name: "",
                id: "",
                email: "",
                joined: ""
            })
        }
    }
    return (
        <userContext.Provider value={{
            user,
            login,
            logout
        }}>
            {children}
        </userContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(userContext);
    if (!context) {
        throw new Error("context  is undefined");
    }
    return context;
}


export default AuthProvider