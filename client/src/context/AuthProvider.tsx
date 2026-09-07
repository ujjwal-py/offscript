import { useEffect, useState, type ReactNode } from 'react'
import type { User } from '../types';
import { api } from '../Api';
import { userContext } from './AuthContext';


export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const login = async () => {
        setLoading(true);
        try {
            const response = await api.get<User>("/me");
            setUser(response.data);
        } catch (err) {
            console.log(err);
            setUser(null)
        } finally {
            setLoading(false);
        }
    };
    const logout = async () => {
        setLoading(true);
        try {
            await api.post("/logout");
        } catch (err) {
            console.log(err);
        } finally {
            setUser(null)
            setLoading(false);
        }
    }
    useEffect(() => {
        login()
    }, [])
    return (
        <userContext.Provider value={{
            user,
            login,
            logout,
            loading
        }}>
            {children}
        </userContext.Provider>
    )
}

export default AuthProvider