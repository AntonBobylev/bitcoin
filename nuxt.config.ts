// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  app: {
    head: {
      title: 'Anton Bobylev | Historical Bitcoin Price Data Application',
      meta: [
        { name: 'description', content: 'Application to display historical Bitcoin price date. Made by Anton Bobylev 2024' },
        { name: 'lang', content: 'en' },
      ]
    }
  },
})
