import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { useCookie } from "#app";
// GraphQL Mutations
const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      tokenType
      expiresIn
      accessToken
      refreshToken
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation logout {
    logout
  }
`;

const REGISTER_MUTATION = gql`
  mutation UserCreate($input: UserCreateInput!) {
    userCreate(input: $input) {
      id
      name
      email
      __typename
    }
  }
`;

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
        const redirect = route.path === "/profile" ? "/" : route.query.redirect;
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
