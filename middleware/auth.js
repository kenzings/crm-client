// Middleware to check if the user is authenticated
export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem('apollo-token');
    if (!token) {
      return navigateTo('/login');
    }
  }
});