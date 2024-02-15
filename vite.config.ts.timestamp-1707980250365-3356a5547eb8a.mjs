// vite.config.ts
import VueI18nPlugin from "file:///Users/kimnayoung/Documents/workspace/web.checkup.main/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import vue from "file:///Users/kimnayoung/Documents/workspace/web.checkup.main/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/kimnayoung/Documents/workspace/web.checkup.main/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import dayjs from "file:///Users/kimnayoung/Documents/workspace/web.checkup.main/node_modules/dayjs/dayjs.min.js";
import { dirname, resolve } from "node:path";
import { URL, fileURLToPath } from "node:url";
import { AntDesignVueResolver } from "file:///Users/kimnayoung/Documents/workspace/web.checkup.main/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import Components from "file:///Users/kimnayoung/Documents/workspace/web.checkup.main/node_modules/unplugin-vue-components/dist/vite.mjs";
import { defineConfig, loadEnv } from "file:///Users/kimnayoung/Documents/workspace/web.checkup.main/node_modules/vite/dist/node/index.js";
import { createHtmlPlugin } from "file:///Users/kimnayoung/Documents/workspace/web.checkup.main/node_modules/vite-plugin-html/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///Users/kimnayoung/Documents/workspace/web.checkup.main/node_modules/vite-plugin-svg-icons/dist/index.mjs";

// package.json
var package_default = {
  name: "web.checkup.main",
  version: "0.0.0",
  homepage: "https://github.com/popcorn5corp/web.checkup.main",
  repository: {
    type: "github",
    url: "https://github.com/popcorn5corp/web.checkup.main.git"
  },
  author: {
    name: "CheckUP Corp."
  },
  private: true,
  type: "module",
  scripts: {
    dev: "vite",
    start: "vite preview --port 8080",
    "build:typecheck": "run-p type-check build-only",
    build: "run-p build-only",
    "build:dev": "yarn build",
    "build:storybook": "storybook build",
    preview: "vite preview",
    "test:unit": "vitest",
    "test:e2e": "start-server-and-test preview http://localhost:4173 'cypress run --e2e'",
    "test:e2e:dev": "start-server-and-test 'vite dev --port 4173' http://localhost:4173 'cypress open --e2e'",
    "build-only": "vite build",
    "type-check": "vue-tsc --noEmit -p tsconfig.vitest.json --composite false",
    lint: "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    format: "prettier --write src/",
    chromatic: "npx chromatic --project-token=chpt_fec61767df74bb7",
    "build-storybook": "storybook build",
    storybook: "storybook dev -p 6006"
  },
  dependencies: {
    "@fortawesome/fontawesome-svg-core": "^6.4.0",
    "@fortawesome/free-brands-svg-icons": "^6.4.0",
    "@fortawesome/free-regular-svg-icons": "^6.4.0",
    "@fortawesome/free-solid-svg-icons": "^6.4.0",
    "@fortawesome/vue-fontawesome": "^3.0.3",
    "@intlify/unplugin-vue-i18n": "^0.12.0",
    "@storybook/addon-docs": "^7.6.7",
    "@storybook/preset-scss": "^1.0.3",
    "@types/lodash-es": "^4.17.7",
    "@types/vue-i18n": "^7.0.0",
    "@vitejs/plugin-vue-jsx": "^3.0.1",
    "ant-design-vue": "4.x",
    axios: "^1.4.0",
    "chart.js": "^4.4.1",
    dayjs: "^1.11.9",
    "file-saver": "^2.0.5",
    "lodash-es": "^4.17.21",
    pinia: "^2.0.36",
    "pinia-plugin-persistedstate": "^3.2.1",
    qs: "^6.11.2",
    radium: "^0.26.2",
    sass: "^1.63.2",
    sortablejs: "^1.15.0",
    "storybook-design-token": "^3.0.0",
    "string-width": "^6.1.0",
    "vite-plugin-html": "^3.2.0",
    "vite-plugin-svg-icons": "^2.0.1",
    vue: "^3.3.2",
    "vue-i18n": "^9.3.0-beta.21",
    "vue-responsive-dash": "^0.5.0",
    "vue-router": "^4.2.0"
  },
  devDependencies: {
    "@rushstack/eslint-patch": "^1.2.0",
    "@storybook/addon-a11y": "^7.6.7",
    "@storybook/addon-essentials": "^7.6.7",
    "@storybook/addon-interactions": "^7.6.7",
    "@storybook/addon-links": "^7.6.7",
    "@storybook/addon-mdx-gfm": "^7.6.7",
    "@storybook/blocks": "^7.6.7",
    "@storybook/manager-api": "^7.6.7",
    "@storybook/storybook-deployer": "^2.8.16",
    "@storybook/testing-library": "^0.2.2",
    "@storybook/theming": "^7.6.7",
    "@storybook/vue3": "^7.6.7",
    "@storybook/vue3-vite": "^7.6.7",
    "@trivago/prettier-plugin-sort-imports": "^4.2.0",
    "@tsconfig/node18": "^2.0.1",
    "@types/file-saver": "^2.0.5",
    "@types/jsdom": "^21.1.1",
    "@types/node": "^18.16.8",
    "@types/node-fetch": "^2.6.6",
    "@types/sortablejs": "^1.15.2",
    "@vitejs/plugin-vue": "^4.2.3",
    "@vue/eslint-config-prettier": "^7.1.0",
    "@vue/eslint-config-typescript": "^11.0.3",
    "@vue/test-utils": "^2.3.2",
    "@vue/tsconfig": "^0.4.0",
    chromatic: "^10.2.0",
    cypress: "^12.12.0",
    eslint: "^8.39.0",
    "eslint-plugin-cypress": "^2.13.3",
    "eslint-plugin-storybook": "^0.6.15",
    "eslint-plugin-vue": "^9.11.0",
    "gh-pages": "^6.0.0",
    jsdom: "^22.0.0",
    "npm-run-all": "^4.1.5",
    prettier: "^2.8.8",
    "start-server-and-test": "^2.0.0",
    storybook: "^7.6.7",
    "storybook-addon-i18n": "^5.1.13",
    "storybook-addon-vue-slots": "^0.9.29",
    typescript: "~5.0.4",
    "unplugin-vue-components": "^0.24.1",
    vite: "^4.3.5",
    "vite-tsconfig-paths": "^4.2.1",
    vitest: "^0.31.0",
    "vue-tsc": "^1.6.4",
    "webpack-bundle-analyzer": "^4.9.1"
  },
  resolutions: {
    jackspeak: "2.1.1"
  },
  readme: "ERROR: No README data found!",
  _id: "web.checkup.main@0.0.0",
  engines: {
    node: ">=20.9.0",
    npm: ">=10.1.0"
  }
};

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///Users/kimnayoung/Documents/workspace/web.checkup.main/vite.config.ts";
var CWD = process.cwd();
var { dependencies, devDependencies, name, version } = package_default;
var __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};
var vite_config_default = defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd());
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
        include: resolve(dirname(fileURLToPath(__vite_injected_original_import_meta_url)), "./src/locales/lang/*/**")
        // provide a path to the folder where you'll store translation data (see below)
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false
            // css in js
          })
        ]
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(CWD, "src/assets/svgs")],
        // Specify symbolId format
        symbolId: "svg-icon-[dir]-[name]"
      })
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
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
      host: true,
      // 0.0.0.0
      port: 4e3,
      strictPort: true,
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
      target: "modules",
      outDir: "dist",
      minify: "esbuild"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2tpbW5heW91bmcvRG9jdW1lbnRzL3dvcmtzcGFjZS93ZWIuY2hlY2t1cC5tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMva2ltbmF5b3VuZy9Eb2N1bWVudHMvd29ya3NwYWNlL3dlYi5jaGVja3VwLm1haW4vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2tpbW5heW91bmcvRG9jdW1lbnRzL3dvcmtzcGFjZS93ZWIuY2hlY2t1cC5tYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IFZ1ZUkxOG5QbHVnaW4gZnJvbSAnQGludGxpZnkvdW5wbHVnaW4tdnVlLWkxOG4vdml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xuaW1wb3J0IHsgZGlybmFtZSwgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB7IFVSTCwgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHsgQW50RGVzaWduVnVlUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgdHlwZSBVc2VyQ29uZmlnLCBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5cbmNvbnN0IENXRCA9IHByb2Nlc3MuY3dkKClcbmNvbnN0IHsgZGVwZW5kZW5jaWVzLCBkZXZEZXBlbmRlbmNpZXMsIG5hbWUsIHZlcnNpb24gfSA9IHBrZ1xuY29uc3QgX19BUFBfSU5GT19fID0ge1xuICBwa2c6IHsgZGVwZW5kZW5jaWVzLCBkZXZEZXBlbmRlbmNpZXMsIG5hbWUsIHZlcnNpb24gfSxcbiAgbGFzdEJ1aWxkVGltZTogZGF5anMoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKVxufVxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUsIHNzckJ1aWxkIH0pOiBVc2VyQ29uZmlnID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxuXG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICB2dWVKc3goKSxcbiAgICAgIGNyZWF0ZUh0bWxQbHVnaW4oe1xuICAgICAgICBtaW5pZnk6IHRydWUsXG4gICAgICAgIGluamVjdDoge1xuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHRpdGxlOiBlbnYuVklURV9HTE9CX0FQUF9USVRMRVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBWdWVJMThuUGx1Z2luKHtcbiAgICAgICAgaW5jbHVkZTogcmVzb2x2ZShkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSksICcuL3NyYy9sb2NhbGVzL2xhbmcvKi8qKicpIC8vIHByb3ZpZGUgYSBwYXRoIHRvIHRoZSBmb2xkZXIgd2hlcmUgeW91J2xsIHN0b3JlIHRyYW5zbGF0aW9uIGRhdGEgKHNlZSBiZWxvdylcbiAgICAgIH0pLFxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAgIEFudERlc2lnblZ1ZVJlc29sdmVyKHtcbiAgICAgICAgICAgIGltcG9ydFN0eWxlOiBmYWxzZSAvLyBjc3MgaW4ganNcbiAgICAgICAgICB9KVxuICAgICAgICBdXG4gICAgICB9KSxcbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgICAgLy8gU3BlY2lmeSB0aGUgaWNvbiBmb2xkZXIgdG8gYmUgY2FjaGVkXG4gICAgICAgIGljb25EaXJzOiBbcmVzb2x2ZShDV0QsICdzcmMvYXNzZXRzL3N2Z3MnKV0sXG4gICAgICAgIC8vIFNwZWNpZnkgc3ltYm9sSWQgZm9ybWF0XG4gICAgICAgIHN5bWJvbElkOiAnc3ZnLWljb24tW2Rpcl0tW25hbWVdJ1xuICAgICAgfSlcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgICAgIC8vICd2dWUtaTE4bic6ICd2dWUtaTE4bi9kaXN0L3Z1ZS1pMThuLmNqcy5qcydcbiAgICAgIH1cbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBcbiAgICAgICAgICAgIEBpbXBvcnQgXCIuL3NyYy9zdHlsZXMvYmFzZS9fdmFyaWFibGVzLnNjc3NcIjtcbiAgICAgICAgICAgIEBpbXBvcnQgXCIuL3NyYy9zdHlsZXMvYmFzZS9fbWVkaWFRdWVyeS5zY3NzXCI7XG4gICAgICAgICAgYFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhvc3Q6IHRydWUsIC8vIDAuMC4wLjBcbiAgICAgIHBvcnQ6IDQwMDAsXG4gICAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgICAgY29yczogdHJ1ZSxcbiAgICAgIC8vIHByb3h5OiB7XG4gICAgICAvLyAgICcvYXBwLWFwaSc6IHtcbiAgICAgIC8vICAgICB0YXJnZXQ6ICdodHRwOi8vZGV2LmNoZWNrdXAtYXBpLmNvLmtyJyxcbiAgICAgIC8vICAgICBjaGFuZ2VPcmlnaW46IGlzRGV2LFxuICAgICAgLy8gICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXi9hcHAtYXBpYCksICcnKSxcbiAgICAgIC8vICAgICBzZWN1cmU6ICFpc0RldixcbiAgICAgIC8vICAgICB3czogdHJ1ZVxuICAgICAgLy8gICB9LFxuICAgICAgLy8gICAnL2F1dGgtYXBpJzoge1xuICAgICAgLy8gICAgIHRhcmdldDogJ2h0dHA6Ly9kZXYtYXV0aC5jaGVja3VwLWFwaS5jby5rcicsXG4gICAgICAvLyAgICAgY2hhbmdlT3JpZ2luOiBpc0RldixcbiAgICAgIC8vICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4vYXV0aC1hcGlgKSwgJycpLFxuICAgICAgLy8gICAgIHNlY3VyZTogIWlzRGV2LFxuICAgICAgLy8gICAgIHdzOiB0cnVlXG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0sXG4gICAgICBobXI6IHtcbiAgICAgICAgb3ZlcmxheTogZmFsc2VcbiAgICAgIH1cbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICB0YXJnZXQ6ICdtb2R1bGVzJyxcbiAgICAgIG91dERpcjogJ2Rpc3QnLFxuICAgICAgbWluaWZ5OiAnZXNidWlsZCdcbiAgICB9XG4gIH1cbn0pXG4iLCAie1xuICBcIm5hbWVcIjogXCJ3ZWIuY2hlY2t1cC5tYWluXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4wXCIsXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vcG9wY29ybjVjb3JwL3dlYi5jaGVja3VwLm1haW5cIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRodWJcIixcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9wb3Bjb3JuNWNvcnAvd2ViLmNoZWNrdXAubWFpbi5naXRcIlxuICB9LFxuICBcImF1dGhvclwiOiB7XG4gICAgXCJuYW1lXCI6IFwiQ2hlY2tVUCBDb3JwLlwiXG4gIH0sXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcInN0YXJ0XCI6IFwidml0ZSBwcmV2aWV3IC0tcG9ydCA4MDgwXCIsXG4gICAgXCJidWlsZDp0eXBlY2hlY2tcIjogXCJydW4tcCB0eXBlLWNoZWNrIGJ1aWxkLW9ubHlcIixcbiAgICBcImJ1aWxkXCI6IFwicnVuLXAgYnVpbGQtb25seVwiLFxuICAgIFwiYnVpbGQ6ZGV2XCI6IFwieWFybiBidWlsZFwiLFxuICAgIFwiYnVpbGQ6c3Rvcnlib29rXCI6IFwic3Rvcnlib29rIGJ1aWxkXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJ0ZXN0OnVuaXRcIjogXCJ2aXRlc3RcIixcbiAgICBcInRlc3Q6ZTJlXCI6IFwic3RhcnQtc2VydmVyLWFuZC10ZXN0IHByZXZpZXcgaHR0cDovL2xvY2FsaG9zdDo0MTczICdjeXByZXNzIHJ1biAtLWUyZSdcIixcbiAgICBcInRlc3Q6ZTJlOmRldlwiOiBcInN0YXJ0LXNlcnZlci1hbmQtdGVzdCAndml0ZSBkZXYgLS1wb3J0IDQxNzMnIGh0dHA6Ly9sb2NhbGhvc3Q6NDE3MyAnY3lwcmVzcyBvcGVuIC0tZTJlJ1wiLFxuICAgIFwiYnVpbGQtb25seVwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcInR5cGUtY2hlY2tcIjogXCJ2dWUtdHNjIC0tbm9FbWl0IC1wIHRzY29uZmlnLnZpdGVzdC5qc29uIC0tY29tcG9zaXRlIGZhbHNlXCIsXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC4gLS1leHQgLnZ1ZSwuanMsLmpzeCwuY2pzLC5tanMsLnRzLC50c3gsLmN0cywubXRzIC0tZml4IC0taWdub3JlLXBhdGggLmdpdGlnbm9yZVwiLFxuICAgIFwiZm9ybWF0XCI6IFwicHJldHRpZXIgLS13cml0ZSBzcmMvXCIsXG4gICAgXCJjaHJvbWF0aWNcIjogXCJucHggY2hyb21hdGljIC0tcHJvamVjdC10b2tlbj1jaHB0X2ZlYzYxNzY3ZGY3NGJiN1wiLFxuICAgIFwiYnVpbGQtc3Rvcnlib29rXCI6IFwic3Rvcnlib29rIGJ1aWxkXCIsXG4gICAgXCJzdG9yeWJvb2tcIjogXCJzdG9yeWJvb2sgZGV2IC1wIDYwMDZcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmVcIjogXCJeNi40LjBcIixcbiAgICBcIkBmb3J0YXdlc29tZS9mcmVlLWJyYW5kcy1zdmctaWNvbnNcIjogXCJeNi40LjBcIixcbiAgICBcIkBmb3J0YXdlc29tZS9mcmVlLXJlZ3VsYXItc3ZnLWljb25zXCI6IFwiXjYuNC4wXCIsXG4gICAgXCJAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnNcIjogXCJeNi40LjBcIixcbiAgICBcIkBmb3J0YXdlc29tZS92dWUtZm9udGF3ZXNvbWVcIjogXCJeMy4wLjNcIixcbiAgICBcIkBpbnRsaWZ5L3VucGx1Z2luLXZ1ZS1pMThuXCI6IFwiXjAuMTIuMFwiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1kb2NzXCI6IFwiXjcuNi43XCIsXG4gICAgXCJAc3Rvcnlib29rL3ByZXNldC1zY3NzXCI6IFwiXjEuMC4zXCIsXG4gICAgXCJAdHlwZXMvbG9kYXNoLWVzXCI6IFwiXjQuMTcuN1wiLFxuICAgIFwiQHR5cGVzL3Z1ZS1pMThuXCI6IFwiXjcuMC4wXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI6IFwiXjMuMC4xXCIsXG4gICAgXCJhbnQtZGVzaWduLXZ1ZVwiOiBcIjQueFwiLFxuICAgIFwiYXhpb3NcIjogXCJeMS40LjBcIixcbiAgICBcImNoYXJ0LmpzXCI6IFwiXjQuNC4xXCIsXG4gICAgXCJkYXlqc1wiOiBcIl4xLjExLjlcIixcbiAgICBcImZpbGUtc2F2ZXJcIjogXCJeMi4wLjVcIixcbiAgICBcImxvZGFzaC1lc1wiOiBcIl40LjE3LjIxXCIsXG4gICAgXCJwaW5pYVwiOiBcIl4yLjAuMzZcIixcbiAgICBcInBpbmlhLXBsdWdpbi1wZXJzaXN0ZWRzdGF0ZVwiOiBcIl4zLjIuMVwiLFxuICAgIFwicXNcIjogXCJeNi4xMS4yXCIsXG4gICAgXCJyYWRpdW1cIjogXCJeMC4yNi4yXCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuNjMuMlwiLFxuICAgIFwic29ydGFibGVqc1wiOiBcIl4xLjE1LjBcIixcbiAgICBcInN0b3J5Ym9vay1kZXNpZ24tdG9rZW5cIjogXCJeMy4wLjBcIixcbiAgICBcInN0cmluZy13aWR0aFwiOiBcIl42LjEuMFwiLFxuICAgIFwidml0ZS1wbHVnaW4taHRtbFwiOiBcIl4zLjIuMFwiLFxuICAgIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI6IFwiXjIuMC4xXCIsXG4gICAgXCJ2dWVcIjogXCJeMy4zLjJcIixcbiAgICBcInZ1ZS1pMThuXCI6IFwiXjkuMy4wLWJldGEuMjFcIixcbiAgICBcInZ1ZS1yZXNwb25zaXZlLWRhc2hcIjogXCJeMC41LjBcIixcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4yLjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAcnVzaHN0YWNrL2VzbGludC1wYXRjaFwiOiBcIl4xLjIuMFwiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1hMTF5XCI6IFwiXjcuNi43XCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWVzc2VudGlhbHNcIjogXCJeNy42LjdcIixcbiAgICBcIkBzdG9yeWJvb2svYWRkb24taW50ZXJhY3Rpb25zXCI6IFwiXjcuNi43XCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWxpbmtzXCI6IFwiXjcuNi43XCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLW1keC1nZm1cIjogXCJeNy42LjdcIixcbiAgICBcIkBzdG9yeWJvb2svYmxvY2tzXCI6IFwiXjcuNi43XCIsXG4gICAgXCJAc3Rvcnlib29rL21hbmFnZXItYXBpXCI6IFwiXjcuNi43XCIsXG4gICAgXCJAc3Rvcnlib29rL3N0b3J5Ym9vay1kZXBsb3llclwiOiBcIl4yLjguMTZcIixcbiAgICBcIkBzdG9yeWJvb2svdGVzdGluZy1saWJyYXJ5XCI6IFwiXjAuMi4yXCIsXG4gICAgXCJAc3Rvcnlib29rL3RoZW1pbmdcIjogXCJeNy42LjdcIixcbiAgICBcIkBzdG9yeWJvb2svdnVlM1wiOiBcIl43LjYuN1wiLFxuICAgIFwiQHN0b3J5Ym9vay92dWUzLXZpdGVcIjogXCJeNy42LjdcIixcbiAgICBcIkB0cml2YWdvL3ByZXR0aWVyLXBsdWdpbi1zb3J0LWltcG9ydHNcIjogXCJeNC4yLjBcIixcbiAgICBcIkB0c2NvbmZpZy9ub2RlMThcIjogXCJeMi4wLjFcIixcbiAgICBcIkB0eXBlcy9maWxlLXNhdmVyXCI6IFwiXjIuMC41XCIsXG4gICAgXCJAdHlwZXMvanNkb21cIjogXCJeMjEuMS4xXCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4xOC4xNi44XCIsXG4gICAgXCJAdHlwZXMvbm9kZS1mZXRjaFwiOiBcIl4yLjYuNlwiLFxuICAgIFwiQHR5cGVzL3NvcnRhYmxlanNcIjogXCJeMS4xNS4yXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNC4yLjNcIixcbiAgICBcIkB2dWUvZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl43LjEuMFwiLFxuICAgIFwiQHZ1ZS9lc2xpbnQtY29uZmlnLXR5cGVzY3JpcHRcIjogXCJeMTEuMC4zXCIsXG4gICAgXCJAdnVlL3Rlc3QtdXRpbHNcIjogXCJeMi4zLjJcIixcbiAgICBcIkB2dWUvdHNjb25maWdcIjogXCJeMC40LjBcIixcbiAgICBcImNocm9tYXRpY1wiOiBcIl4xMC4yLjBcIixcbiAgICBcImN5cHJlc3NcIjogXCJeMTIuMTIuMFwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguMzkuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1jeXByZXNzXCI6IFwiXjIuMTMuM1wiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1zdG9yeWJvb2tcIjogXCJeMC42LjE1XCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXZ1ZVwiOiBcIl45LjExLjBcIixcbiAgICBcImdoLXBhZ2VzXCI6IFwiXjYuMC4wXCIsXG4gICAgXCJqc2RvbVwiOiBcIl4yMi4wLjBcIixcbiAgICBcIm5wbS1ydW4tYWxsXCI6IFwiXjQuMS41XCIsXG4gICAgXCJwcmV0dGllclwiOiBcIl4yLjguOFwiLFxuICAgIFwic3RhcnQtc2VydmVyLWFuZC10ZXN0XCI6IFwiXjIuMC4wXCIsXG4gICAgXCJzdG9yeWJvb2tcIjogXCJeNy42LjdcIixcbiAgICBcInN0b3J5Ym9vay1hZGRvbi1pMThuXCI6IFwiXjUuMS4xM1wiLFxuICAgIFwic3Rvcnlib29rLWFkZG9uLXZ1ZS1zbG90c1wiOiBcIl4wLjkuMjlcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJ+NS4wLjRcIixcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjQuMVwiLFxuICAgIFwidml0ZVwiOiBcIl40LjMuNVwiLFxuICAgIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiOiBcIl40LjIuMVwiLFxuICAgIFwidml0ZXN0XCI6IFwiXjAuMzEuMFwiLFxuICAgIFwidnVlLXRzY1wiOiBcIl4xLjYuNFwiLFxuICAgIFwid2VicGFjay1idW5kbGUtYW5hbHl6ZXJcIjogXCJeNC45LjFcIlxuICB9LFxuICBcInJlc29sdXRpb25zXCI6IHtcbiAgICBcImphY2tzcGVha1wiOiBcIjIuMS4xXCJcbiAgfSxcbiAgXCJyZWFkbWVcIjogXCJFUlJPUjogTm8gUkVBRE1FIGRhdGEgZm91bmQhXCIsXG4gIFwiX2lkXCI6IFwid2ViLmNoZWNrdXAubWFpbkAwLjAuMFwiLFxuICBcImVuZ2luZXNcIjoge1xuICAgIFwibm9kZVwiOiBcIj49MjAuOS4wXCIsXG4gICAgXCJucG1cIjogXCI+PTEwLjEuMFwiXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1YsT0FBTyxtQkFBbUI7QUFDOVcsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFdBQVc7QUFDbEIsU0FBUyxTQUFTLGVBQWU7QUFDakMsU0FBUyxLQUFLLHFCQUFxQjtBQUNuQyxTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLGdCQUFnQjtBQUN2QixTQUEwQixjQUFjLGVBQWU7QUFDdkQsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyw0QkFBNEI7OztBQ1ZyQztBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsVUFBWTtBQUFBLEVBQ1osWUFBYztBQUFBLElBQ1osTUFBUTtBQUFBLElBQ1IsS0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLFFBQVU7QUFBQSxJQUNSLE1BQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFXO0FBQUEsRUFDWCxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsSUFDVCxLQUFPO0FBQUEsSUFDUCxPQUFTO0FBQUEsSUFDVCxtQkFBbUI7QUFBQSxJQUNuQixPQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixtQkFBbUI7QUFBQSxJQUNuQixTQUFXO0FBQUEsSUFDWCxhQUFhO0FBQUEsSUFDYixZQUFZO0FBQUEsSUFDWixnQkFBZ0I7QUFBQSxJQUNoQixjQUFjO0FBQUEsSUFDZCxjQUFjO0FBQUEsSUFDZCxNQUFRO0FBQUEsSUFDUixRQUFVO0FBQUEsSUFDVixXQUFhO0FBQUEsSUFDYixtQkFBbUI7QUFBQSxJQUNuQixXQUFhO0FBQUEsRUFDZjtBQUFBLEVBQ0EsY0FBZ0I7QUFBQSxJQUNkLHFDQUFxQztBQUFBLElBQ3JDLHNDQUFzQztBQUFB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
