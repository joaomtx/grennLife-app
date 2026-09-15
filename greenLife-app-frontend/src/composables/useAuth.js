import { computed } from 'vue';
import { useAuthStore } from '../stores/auth';

export function useAuth() {
    const authStore = useAuthStore();

    return {
        user: computed(() => authStore.user),
        isAuthenticated: computed(() => authStore.isAuthenticated),
        login: authStore.login,
        logout: authStore.logout
    };
}
