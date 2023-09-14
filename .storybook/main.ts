import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: [
    '../src/components/**/stories/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/**/docs/*.mdx'
  ],
  // stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx)'],
  // stories: ['../src/**/*.mdx', '../src/**/**/*.stories.@(js|jsx|ts|tsx)'],
  // stories: ["../src/components/**/*.stories.mdx", "../src/components/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-mdx-gfm',
    '@storybook/preset-scss'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
}
export default config
