export default defineNuxtConfig({
  css: [
    '@formkit/themes/genesis',
  ],
  build: {},
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon'
  ],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  runtimeConfig: {
    baseURL: process.env.API_URL
  }
})
