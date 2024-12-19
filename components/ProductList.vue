<template>
  <div>
    <h1>Products</h1>
    <div v-if="productsLoading" class="flex justify-center items-center">
      <svg class="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <div v-if="productsError" class="text-red-600">{{ productsError?.message }}</div>
    <ul v-if="productsList">
      <li v-for="product in productsList" :key="product.id">
        <h2>
          <NuxtLink :to="`/products/${product.id}`">
            {{ product.titleEn }}
          </NuxtLink>
        </h2>
        <p>{{ product.descriptionEn }}</p>
        <p>{{ product.price }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useQueryGraphql } from '@/composables/useQueryGraphql'

const { fetchProducts } = useQueryGraphql()
const { products, productsLoading, productsError } = fetchProducts()
const productsList = computed(() => products.value?.products?.data || [])
</script>