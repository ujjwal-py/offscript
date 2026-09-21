import { create } from 'zustand';

type themeType = 'light' | 'dark';

interface ThemeState {
    theme: themeType;
    setTheme: (theme: themeType) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    theme: 'dark',
    setTheme: (theme: themeType) => set({ theme }),
}));

