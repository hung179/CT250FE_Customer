export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  const isPublicPage = (to.path === '/login' || to.path === '/register' || to.path === '/forget-password')
  if (!authStore.accessToken && !isPublicPage) {
      return navigateTo("/login");
  }
});
