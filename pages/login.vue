<template>
  <LoginForm />
</template>

<script setup>
definePageMeta({
  middleware: 'guest',
  layout: 'guest',
});

</script>
