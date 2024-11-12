<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-full max-w-md px-6 py-8 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-6">Register</h1>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <input
            v-model="name"
            type="text"
            placeholder="Full Name"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
        <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
        <input
            v-model="phone"
            type="tel"
            placeholder="Phone"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
        <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
        <button
            type="submit"
            class="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>
      <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>
      <AuthLink
          title="Đã có tài khoản?"
          route="/login"
          linkText="Đăng nhập ngay"
      />
    </div>

  </div>
</template>

<script setup>
import {ref} from 'vue';
import { useAuthUser } from '@/composables/useAuthUser';

const { register, loading, error } = useAuthUser()
const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');


async function handleRegister() {
  register(name.value, email.value, password.value, phone.value)
}
</script>