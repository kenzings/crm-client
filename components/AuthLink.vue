<template>
  <div class="mt-6 text-center">
    <p class="text-gray-600">
      {{ title }}
      <router-link
          :to="route"
          class="text-blue-500 hover:text-blue-600 font-medium"
      >
        {{ linkText }}
      </router-link>
    </p>
  </div>
</template>

<script setup>
defineProps({
  // Tiêu đề hiển thị (VD: "Nếu chưa có tài khoản?")
  title: {
    type: String,
    required: true
  },
  // Route để điều hướng ('/login' hoặc '/register')
  route: {
    type: String,
    required: true
  },
  // Text của link (VD: "Đăng ký ngay" hoặc "Đăng nhập ngay")
  linkText: {
    type: String,
    required: true
  }
});
</script>