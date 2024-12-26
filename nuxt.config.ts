// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  plugins: ['~/plugins/apollo.client.js'],
  modules: ['@nuxt/image'],
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['@apollo/client', 'ts-invariant/process', '@heroicons/vue'],
  },
  runtimeConfig: {
    apiUrl: process.env.APP_URL_API,
    public: {
      apiUrl: process.env.APP_URL_API
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // apollo: {
  //   autoImports: true,
  //   authHeader: 'Authorization',
  //   authType: 'Bearer',
  //   tokenStorage: 'cookie',
  //   proxyCookies: true,
  //   clients: {
  //     default: {
  //       httpEndpoint: 'http://shino-dev.local/graphql',
  //       httpLinkOptions: {
  //         credentials: 'include'
  //       },
  //       tokenName: 'apollo:crm.token',
  //       tokenStorage: 'cookie',
  //       authType: 'Bearer',
  //       authHeader: 'Authorization'
  //     },
  //   }
  // },
  app: {
    head: {
      charset: 'utf8',
      title: 'CRM',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
      ],
    },
  },
  nitro: {
    preset: 'node-server'
  },
  ssr: false,
});
