// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  typescript: {
    typeCheck: true
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css']
})
