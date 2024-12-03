import process from 'node:process'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  runtimeConfig: {
    public: {
      botToken: process.env.BOT_TOKEN,
      chatId: process.env.CHAT_ID,
    },
  },
  router: {
    // base: '/uuid-telegram/',
  },
})
