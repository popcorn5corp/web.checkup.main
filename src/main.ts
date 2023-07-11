import '@/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from '@/stores'
import { setupFontAwesome, setupAssets } from '@/plugins'
import { setupI18n } from '@/locales'

const app = createApp(App)

function setupPlugins() {
  setupFontAwesome(app)
  setupAssets()
}

async function setupApp() {
  setupStore(app)
  await setupI18n(app)
  await setupRouter(app)
  app.mount('#app')
}

;(async function bootCheckUpMain() {
  setupPlugins()
  await setupApp()
})()
