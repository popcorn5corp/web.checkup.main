import { type Preview, setup, StoryContext } from '@storybook/vue3'
import type { App } from 'vue';
import { createPinia } from 'pinia';
// @ts-ignore
import { setupI18n, setupFontAwesome } from '@/plugins'
// import { themes } from '@storybook/theming';
import './index.scss'

const pinia = createPinia();

setup((app: App) => {
  app.use(pinia);
  setupI18n(app)
  setupFontAwesome(app)
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    // docs: {
    //   theme: themes.dark
    // }
    decorators: [
      (story: StoryContext['component']) => ({
        components: { story },
        template: '<div style="margin: 3em;"><story /></div>'
      })
    ]
  }
}

export default preview
