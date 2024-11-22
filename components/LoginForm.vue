<template>
  <DynamicForm title="Đăng nhập vào tài khoản" :fields="loginFields" :loading="loading" :error="error"
    submit-text="Đăng nhập" loading-text="Đang đăng nhập..." :bottom-link="{
      title: 'Nếu chưa có tài khoản?',
      route: '/register',
      linkText: 'Đăng ký ngay'
    }" @submit="handleSubmit" />
</template>

<script setup>
import { useAuthUser } from '@/composables/useAuthUser'

const { login, loading, error } = useAuthUser()

// Chỉ cần định nghĩa các fields cho login
const loginFields = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email'
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Mật khẩu'
  }
]

const handleSubmit = (formData) => {
  const { email, password } = formData
  login(email, password)
}
</script>