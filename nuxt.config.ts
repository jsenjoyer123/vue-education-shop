import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['@/assets/scss/main.scss'],

  modules: ['@nuxt/eslint'],

  vite: {
    plugins: [
      Icons({
        compiler: 'vue3',
        customCollections: {
          app: FileSystemIconLoader('@/assets/icons', (svg) =>
            svg.replace(/fill="[^"]*"/g, 'fill="currentColor"'),
          ),
        },
      }),

      Components({
        dts: true,
        resolvers: [
          // mdi:cart -> <IconMdiCart />
          // app:cart -> <IconAppCart />
          IconsResolver({
            prefix: 'Icon',
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
    dirs: ['composables', 'composables/**'],
  },
})
