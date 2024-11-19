// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig: {
    apiUrl: process.env.APP_URL_API,
    public: {
      apiUrl: process.env.APP_URL_API
    }
  },
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
    autoImports: true,
    authHeader: 'Authorization',
    authType: 'Bearer',
    tokenStorage: 'cookie',
    proxyCookies: true,
    clients: {
      default: {
        httpEndpoint: 'http://shino-dev.local/graphql',
        httpLinkOptions: {
          credentials: 'include'
        },
        tokenName: 'apollo:crm.token',
        tokenStorage: 'cookie',
        authType: 'Bearer',
        authHeader: 'Authorization'
      },
    }
  },

});