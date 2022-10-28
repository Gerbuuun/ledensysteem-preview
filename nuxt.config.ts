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
    public: {
      PE_API_URL: process.env.PE_API_URL
    }
  }
})
