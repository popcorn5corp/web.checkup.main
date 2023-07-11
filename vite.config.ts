import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

const CWD = process.cwd()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // VueI18nPlugin({
    //   runtimeOnly: false,
    //   include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**') // provide a path to the folder where you'll store translation data (see below)
    // }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ]
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [resolve(CWD, 'src/assets/svgs')],
      // Specify symbolId format
      symbolId: 'svg-icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
