<template>
  <div>
    Index of the
  </div>
</template>

<script setup>
import logoFav from '@/assets/images/logo-fav.png'

// Apply the auth middleware to this page
useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: logoFav }, // Cập nhật favicon
  ]
});
definePageMeta({
  middleware: 'auth',
  layout: 'default',
});
</script>