import { defineStore } from 'pinia';
import * as authService from '../services/authService';

export const useAuthStore = defineStore('auth', {
    state: () => {
        const storedUser = localStorage.getItem('user');
        return {
            token: localStorage.getItem('token') || null,
            user: (storedUser && storedUser !== 'undefined') ? JSON.parse(storedUser) : null,
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async login(credentials) {
            const response = await authService.login(credentials);
            const { user, token } = response.data.data;
            this.token = token;
            this.user = user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
});
