import { setupAssets, setupFontAwesome, setupI18n, setupStore } from '@/plugins'
import { createApp } from 'vue'
import '@/styles/main.scss'
import App from './App.vue'
import { setupRouter } from './router'

const app = createApp(App)

function setupPlugins() {
  setupFontAwesome(app)
  setupAssets()
}

async function setupApp() {
  setupI18n(app)
  setupStore(app)
  await setupRouter(app)
  app.mount('#app')
}

;(async function boot() {
  setupPlugins()
  await setupApp()
})()
