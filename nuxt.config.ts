import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { appIconsCollection } from './utils/icons'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['@/assets/scss/main.scss'],

  modules: ['@nuxt/eslint'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_variables.scss" as *;',
        },
      },
    },
    plugins: [
      Icons({
        compiler: 'vue3',
        customCollections: appIconsCollection,
      }),

      Components({
        dts: false,
        resolvers: [
          IconsResolver({
            prefix: 'Icon',
            customCollections: ['app'],
          }),
        ],
      }),
    ],
  },

  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || '',
    },
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `${process.env.NUXT_APP_BASE_URL || '/'}favicon.ico`,
        },
      ],
    },
  },

  imports: {
    dirs: ['composables/**'],
  },

  nitro: {
    prerender: {
      failOnError: false,
    },
  },
})
