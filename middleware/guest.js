export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client) {
        const token = localStorage.getItem('apollo-token');
        if (token) {
            return navigateTo('/');
        }
    }
});