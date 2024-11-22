<template>
  <LoginForm />
</template>

<script setup>
import loginFav from '@/assets/images/login-favicon.png'
const route = useRoute()
const segments = route.fullPath.split('/').filter(Boolean)
const title = ref(segments)
useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: loginFav }, // Cập nhật favicon
  ]
});
useSeoMeta({
  title: title.value,
  description: `${title.value} to your account`,
  // og: {
  //   type: 'website',
  //   url: 'https://example.com/login',
  //   title: title.value,  // Đảm bảo title.value là chuỗi
  //   description: 'Login to your account',
  // },
  ogImage: {
    width: 1200,
    url: loginFav
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Login',
  //   description: 'Login to your account',
  //   image: '/logo.png',
  // },
  // jsonLd: {
  //   '@context': 'http://schema.org',
  //   '@type': 'WebSite',
  //   url: 'https://example.com/login',
  //   name: 'Login',
  //   description: 'Login to your account',
  //   image: '/logo.png',
  // },
})

definePageMeta({
  middleware: 'guest',
  layout: 'guest',
});

</script>
