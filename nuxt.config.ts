// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  build: {
    transpile: ['@apollo/client', 'ts-invariant/process'],
  },
  plugins: ['~/plugins/apollo.js'],
  modules: ['@nuxtjs/apollo', '@nuxt/image'],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://shino-dev.local/graphql'
      }
    }
  }
});