<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <DynamicForm title="Register" :fields="registerFields" :loading="loading" :error="error"
        submitButtonText="Register"
        buttonClasses="w-full px-6 py-3 font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        @submit="handleSubmit" />
      <div v-if="error" class="mt-4 text-center text-red-600">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { useAuthUser } from '@/composables/useAuthUser'

const { register, loading, error } = useAuthUser()

const registerFields = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Full Name'
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Email'
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: 'Phone Number'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Password'
  }
]

const handleSubmit = async (formData) => {
  const { name, email, phone, password } = formData
  await register(name, email, phone, password)
}
</script>

<style scoped>
/* Add any additional scoped styles if needed */
</style>