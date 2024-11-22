<template>
  <DynamicForm title="Register" :fields="registerFields" :loading="loading" :error="error" submit-text="Register"
    loading-text="Registering..." :bottom-link="{
      title: 'Đã có tài khoản?',
      route: '/login',
      linkText: 'Đăng nhập ngay'
    }" @submit="handleSubmit" />
</template>

<script setup>
import { useAuthUser } from '@/composables/useAuthUser'

const { register, loading, error } = useAuthUser()

// Chỉ cần định nghĩa các fields cho register
const registerFields = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Full Name'
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email'
  },
  {
    name: 'phone',
    type: 'tel',
    placeholder: 'Phone'
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password'
  }
]

const handleSubmit = (formData) => {
  const { name, email, password, phone } = formData
  register(name, email, password, phone)
}
</script>