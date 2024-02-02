// @ts-ignore
import { setupFontAwesome, setupI18n } from '@/plugins'
import { type Preview, StoryContext, setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import type { App } from 'vue'
// @ts-ignore
import './index.scss'

// import { themes } from '@storybook/theming';

const pinia = createPinia()

setup((app: App) => {
  app.use(pinia)
  setupI18n(app)
  setupFontAwesome(app)
})

const preview: Preview = {
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
    (story) => ({
      components: { story },
      template: '<div class="hihello" style="margin: 1em;padding:1em"><story /></div>'
    })
  ]
}

export default preview
