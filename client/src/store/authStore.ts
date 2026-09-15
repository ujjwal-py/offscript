import { create } from "zustand";

interface User {
    id: string;
    email: string;
    name?: string;
    joined_date: string
}

interface AuthState {
    user: User | null;
    setUser: (user: User) => void;
    logOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    logOut: () => set({ user: null })
}))