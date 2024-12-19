<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div v-if="productLoading" class="flex justify-center items-center">
        <svg class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <div v-if="productError" class="text-red-600">{{ productError?.message }}</div>
      <div v-if="productDetail">
        <h1 class="text-2xl tracking-tight text-gray-900">{{ productDetail.titleEn }}</h1>
        <!-- <img :src="product.images[0]" :alt="product.titleEn" class="w-full rounded-md bg-gray-200 object-cover mt-4" /> -->
        <p class="mt-4 text-gray-700">{{ productDetail.descriptionEn }}</p>
        <p class="mt-4 text-gray-900">{{ productDetail.price }}</p>
        <!-- Add more product details as needed -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useQueryGraphql } from '@/composables/useQueryGraphql'

const route = useRoute()
const id = route.params.id[0] // Extract the first element if it's an array
const { fetchProductById } = useQueryGraphql()
const { product, productLoading, productError } = fetchProductById(id)
const productDetail = computed(() => product.value?.product || [])
</script>

<style scoped>
/* Add any additional scoped styles if needed */
</style>