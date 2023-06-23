import '@/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupStore } from '@/stores'

const app = createApp(App)

function setupPlugins() {}

async function setupApp() {
  setupStore(app)
  // Asynchronous case: language files may be obtained from the server side
  // await setupI18n(app);
  await setupRouter(app)
  app.mount('#app')
}

;(async function startCheckUpMain() {
  await setupApp()
  setupPlugins()
})()
