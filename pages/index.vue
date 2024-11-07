<template>
  <div>
    <h1>Home Page</h1>
    <p>Welcome to the home page!</p>
  </div>
</template>

<script setup>
// Apply the auth middleware to this page
definePageMeta({
  middleware: 'auth', // Áp dụng middleware "auth" cho trang này
});
</script>