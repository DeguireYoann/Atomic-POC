// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://static.cloud.coveo.com/atomic/v2/themes/coveo.css' },
        { rel: "preconnect", href: "https://fonts.googleapis.com"},
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" },
      ],
      script: [{ src: 'https://static.cloud.coveo.com/atomic/v2/atomic.esm.js' },
    { 
      onload: `CoveoSearchPage.initialize(${process.env.COVEO_API})`,
      src: 'https://search.cloud.coveo.com/rest/organizations/fabricepartnerorgv24xb8k7/searchpage/v1/interfaces/76fd993e-7a64-4b5d-b6dd-730ec79200e7/loader'}],
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
  vite: {
    assetsInclude: ['**/*.html'],
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('atomic-'),
        }
      }
    },
  },
  runtimeConfig: {
  },
})
