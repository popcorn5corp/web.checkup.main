import i18n from '@/locales'
import { setupFontAwesome, setupStore } from '@/plugins'
import { type Preview, StoryContext, setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import type { App } from 'vue'
import '@/styles/theme/dark.scss'
import '@/styles/theme/light.scss'
import '@/styles/theme/semiDark.scss'
import ConfigProvider from './components/ConfigProvider.vue'
import './index.scss'

setup(async (app: App) => {
  await setupStore(app)
  await app.use(i18n)
  await setupFontAwesome(app)
})

const preview: Preview = {
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'ko_KR',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'ko_KR', right: '🇰🇷', title: '한국어' },
          { value: 'en_US', right: '🇺🇸', title: 'English' },
          { value: 'id_ID', right: '🇫🇷', title: 'Bahasa Indonesia' }
        ]
      }
    },

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
          name: 'dark',
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
    (story, { globals }) => {
      const { locale, theme: colorPrimary, backgrounds } = globals
      i18n.global.locale.value = locale
      const theme = backgrounds?.value === 'rgba(40,42,66)' ? 'dark' : 'light'

      return {
        components: { story, ConfigProvider },
        template: `<html data-theme="${theme}" class="container" style="padding: 1rem;"><ConfigProvider theme="${theme}" colorPrimary="${colorPrimary}"><story /></ConfigProvider></html>`
      }
    }
  ]
}

export default preview
