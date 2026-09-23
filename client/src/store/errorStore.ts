import { create } from "zustand";

export type errorType = {
    message: string,
    errCode: string,
}

type ErrorState = {
    error: errorType | null;
    setError: (error: errorType) => void;
    clearError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
    error: null,
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),
}));