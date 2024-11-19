import { useCookie } from '#app'
export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('apollo:crm.token').value;
    if (!token) {
      return navigateTo('/login');
    }
});