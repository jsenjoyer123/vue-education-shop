import { fileURLToPath, URL } from 'node:url'
import IconsResolver from 'unplugin-icons/resolver'
import { appIconsCollection } from './utils/icons'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['@/assets/scss/main.scss'],

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('swiper-'),
    },
  },

  swiper: {
    bundled: false,
  },

  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    'nuxt-swiper',
    '@nuxt/test-utils/module',
    [
      'unplugin-icons/nuxt',
      {
        compiler: 'vue3',
        customCollections: appIconsCollection,
      },
    ],
    [
      'unplugin-vue-components/nuxt',
      {
        dts: false,
        resolvers: [
          IconsResolver({
            prefix: 'Icon',
            customCollections: ['app'],
          }),
        ],
      },
    ],
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_variables.scss" as *;',
        },
      },
    },
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
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Shoppe - Online Education Store',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        {
          name: 'description',
          content:
            'Shoppe online store offering a wide selection of products, education materials, clothing and accessories.',
        },
      ],
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
    dirs: ['composables/**', 'stores/**'],
  },

  nitro: {
    prerender: {
      failOnError: false,
    },
  },
})
