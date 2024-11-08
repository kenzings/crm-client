// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ['@apollo/client', 'ts-invariant/process', '@heroicons/vue'],
  },
  plugins: ['~/plugins/apollo.js'],
  modules: ['@nuxtjs/apollo', '@nuxt/image'],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://shino-dev.local/graphql',
        authHeader: 'Bearer'
      },

    }
  }
});