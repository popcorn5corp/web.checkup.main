import { type Preview, setup } from '@storybook/vue3'
import type { App } from 'vue';
import { createPinia } from 'pinia';
// import router from 'vue-router';
// import { themes } from '@storybook/theming';
import './index.scss'

const pinia = createPinia();

setup((app: App) => {
  app.use(pinia);
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
      (story) => ({
        components: { story },
        template: '<div style="margin: 3em;"><story /></div>'
      })
    ]
  }
}

export default preview
