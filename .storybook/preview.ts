// @ts-ignore
import { localeMessages } from '@/locales'
import { setupFontAwesome, setupStore } from '@/plugins'
import { type Preview, StoryContext, setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import '@/styles/theme/dark.scss'
import '@/styles/theme/light.scss'
import '@/styles/theme/semiDark.scss'
import ConfigProvider from './components/ConfigProvider.vue'
import './index.scss'

// import { themes } from '@storybook/theming';

// const pinia = createPinia()

setup((app: App) => {
  setupStore(app)
  app.use(
    createI18n({
      legacy: false,
      allowComposition: true,
      locale: 'ko_KR',
      fallbackLocale: 'ko_KR',
      messages: localeMessages,
      globalInjection: true
    })
  )
  setupFontAwesome(app)
})

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'Daybreak',
      toolbar: {
        title: 'Primary Color',
        icon: 'circlehollow',
        items: ['Daybreak', 'Dust', 'Volcano', 'Sunset', 'Cyan', 'Green', 'Geekblue', 'Purple'],
        dynamicTitle: true
      }
    }
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff'
        },
        {
          name: 'realDark',
          value: 'rgba(40,42,66)'
        }
      ]
    },
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  decorators: [
    (story, context) => {
      const theme = context.globals?.backgrounds?.value === 'rgba(40,42,66)' ? 'realDark' : 'light'
      const colorPrimary = context.globals.theme

      return {
        components: { story, ConfigProvider },
        template: `<html data-theme="${theme}" class="container" style="padding: 1rem;"><ConfigProvider theme="${theme}" colorPrimary="${colorPrimary}"><story /></ConfigProvider></html>`
      }
    }
  ]
}

export default preview
