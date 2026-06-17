import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                isAuthenticated: false,

                login: (userData) => set({
                    user: userData,
                    isAuthenticated: true
                }),

                logout: () => set({
                    user: null,
                    isAuthenticated: false
                })
            }), { name: 'authStore' }))
)