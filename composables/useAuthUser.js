import { useMutation } from "@vue/apollo-composable";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { useCookie } from "#app";
import { LOGIN_MUTATION, REGISTER_MUTATION, LOGOUT_MUTATION } from "../graphql/useMutationGraphql";

export function useAuthUser() {
  const router = useRouter();
  const route = useRoute();
  const loading = ref(false);
  const error = ref(null);
  const tokenCookie = useCookie("apollo:crm.token");

  // Login function
  async function login(email, password) {
    const { mutate: loginMutation } = useMutation(LOGIN_MUTATION);
    loading.value = true;
    try {
      const result = await loginMutation({
        input: {
          email,
          password,
        },
      });
      if (result?.data?.login?.accessToken) {
        tokenCookie.value = result.data.login.accessToken;
        const redirect = route.query.redirect || "/";
        router.push(redirect);
      }
    } catch (err) {
      error.value = err.message;
      console.error("Login failed:", err);
    } finally {
      loading.value = false;
    }
  }

  //register function
  async function register(name, email, password, phone) {
    const { mutate: registerMutation } = useMutation(REGISTER_MUTATION);
    loading.value = true;
    try {
      const { data } = await registerMutation({
        input: {
          name,
          email,
          password,
          phone,
        },
      });
      if (data?.userCreate) {
        await router.push("/login");
      }
    } catch (err) {
      error.value = err.message;
    }
  }

  // Logout function
  async function logout() {
    const { mutate: logoutMutation } = useMutation(LOGOUT_MUTATION);
    loading.value = true;
    try {
      const { data } = await logoutMutation();
      if (data?.logout) {
        tokenCookie.value = null;
        const redirect = route.query.redirect || "/";
        await router.push(redirect);
      }
    } catch (err) {
      error.value = err.message;
      console.error("Logout failed:", err);
    } finally {
      loading.value = false;
    }
  }

  return {
    login,
    register,
    logout,
    loading,
    error,
  };
}
