// @ts-ignore
import { setupFontAwesome, setupI18n } from '@/plugins'
import { type Preview, StoryContext, setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import type { App } from 'vue'
// @ts-ignore
import './index.scss'
import ConfigProvider from './ConfigProvider.vue'

// import { themes } from '@storybook/theming';

const pinia = createPinia()

setup((app: App) => {
  app.use(pinia)
  setupI18n(app)
  setupFontAwesome(app)
})

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        // The label to show for this toolbar item
        title: 'Theme',
        icon: 'circlehollow',
        // Array of plain string values or MenuItem shape (see below)
        items: ['light', 'realDark'],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
    // docs: {
    //   theme: themes.dark
    // }

    // options: {
    //   storySort: {
    //     order: ['Intro', 'Pages', ['Home', 'Login', 'Admin'], 'Components'],
    //   },
    // },
  },
  decorators: [
    (story, context) => {
const theme : string= context.globals.theme
console.log(theme)
      return {
        components: { story,ConfigProvider },
        template:`<ConfigProvider theme="${theme}"><story /></ConfigProvider>`
      }
    }
  ]
}

export default preview
