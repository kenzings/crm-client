import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('apolloClient', nuxtApp.$apollo.defaultClient)
})