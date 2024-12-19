<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <DynamicForm
        :fields="loginFields"
        submitButtonText="Đăng nhập"
        :onSubmit="handleSubmit"
        :loading="loading"
        buttonClasses="w-full px-6 py-3 font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      />
      <div v-if="error" class="mt-4 text-center text-red-600">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthUser } from '@/composables/useAuthUser'
import DynamicForm from '@/components/DynamicForm.vue'

const { login, loading, error } = useAuthUser()

const loginFields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Email'
  },
  {
    name: 'password',
    label: 'Mật khẩu',
    type: 'password',
    placeholder: 'Mật khẩu'
  }
]

const handleSubmit = async (formData) => {
  const { email, password } = formData
  await login(email, password)
}
</script>

<style scoped>
/* Add any additional scoped styles if needed */
</style>