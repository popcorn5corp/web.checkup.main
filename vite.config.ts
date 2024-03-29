import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dayjs from 'dayjs'
import { dirname, resolve } from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { type UserConfig, defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import pkg from './package.json'

const CWD = process.cwd()
const { dependencies, devDependencies, name, version, engines } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

// @ts-ignore
export default defineConfig(({ command, mode, ssrBuild }): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  const {
    pkg: { dependencies, version },
    lastBuildTime
  } = __APP_INFO__

  console.log(`
     ██████╗ ██╗  ██╗ ███████╗  ██████╗ ██╗  ██╗ ██╗   ██╗ ██████╗ 
    ██╔════╝ ██║  ██║ ██╔════╝ ██╔════╝ ██║ ██╔╝ ██║   ██║ ██╔══██╗
    ██║      ███████║ █████╗   ██║      █████╔╝  ██║   ██║ ██████╔╝
    ██║      ██╔══██║ ██╔══╝   ██║      ██╔═██╗  ██║   ██║ ██╔═══╝ 
    ╚██████╗ ██║  ██║ ███████╗ ╚██████╗ ██║  ██╗ ╚██████╔╝ ██║     
     ╚═════╝ ╚═╝  ╚═╝ ╚══════╝  ╚═════╝ ╚═╝  ╚═╝  ╚═════╝  ╚═╝
     project: ${version} 
     node: ${engines.node} 
     vue: ${dependencies.vue}
     last build time: ${lastBuildTime}         
`)

  return {
    plugins: [
      vue(),
      vueJsx(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: env.VITE_GLOB_APP_TITLE
          }
        }
      }),
      VueI18nPlugin({
        include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/lang/*/**') // provide a path to the folder where you'll store translation data (see below)
      }),
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
        // 'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "./src/styles/base/_variables.scss";
            @import "./src/styles/base/_mediaQuery.scss";
          `
        }
      }
    },
    server: {
      host: true, // 0.0.0.0
      port: 4000,
      // strictPort: true,
      cors: true,
      // proxy: {
      //   '/app-api': {
      //     target: 'http://dev.checkup-api.co.kr',
      //     changeOrigin: isDev,
      //     rewrite: (path) => path.replace(new RegExp(`^/app-api`), ''),
      //     secure: !isDev,
      //     ws: true
      //   },
      //   '/auth-api': {
      //     target: 'http://dev-auth.checkup-api.co.kr',
      //     changeOrigin: isDev,
      //     rewrite: (path) => path.replace(new RegExp(`^/auth-api`), ''),
      //     secure: !isDev,
      //     ws: true
      //   }
      // },
      hmr: {
        overlay: false
      }
    },
    build: {
      target: 'modules',
      outDir: 'dist',
      minify: 'esbuild'
    }
  }
})
