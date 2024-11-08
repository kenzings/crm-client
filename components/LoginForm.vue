<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Đăng nhập vào tài khoản
        </h2>
      </div>

      <!-- Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <!-- Email Input -->
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
                id="email"
                v-model="email"
                type="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="sr-only">Mật khẩu</label>
            <input
                id="password"
                v-model="password"
                type="password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Mật khẩu"
            />
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>

        <!-- Submit Button -->
        <div>
          <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <!-- Loading Spinner -->
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="h-5 w-5 text-blue-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useRouter } from 'vue-router';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      tokenType
      expiresIn
      accessToken
      refreshToken
    }
  }
`;

const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);
const router = useRouter();

const { mutate: executeLogin } = useMutation(
    LOGIN_MUTATION,
    () => ({
      variables: {
        email: email.value,
        password: password.value
      }
    })
);

async function handleLogin() {
  try {
    loading.value = true;
    error.value = null;

    const {data} = await executeLogin();

    if (data?.login?.accessToken) {
      localStorage.setItem('apollo-token', data.login.accessToken);
      router.push('/');
    } else {
      throw new Error('Token không hợp lệ');
    }
  } catch (err) {
    console.error(err);
    error.value = err.message || 'Đã có lỗi xảy ra';
  } finally {
    loading.value = false;
  }
}
</script>