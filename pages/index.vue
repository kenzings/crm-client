<template>
  <div>
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <!-- Your content -->
      </div>
    </main>
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