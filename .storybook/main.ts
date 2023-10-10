import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig, loadConfigFromFile, ConfigEnv, UserConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  stories: [ './docs/*.mdx', '../src/components/**/stories/*.stories.@(js|jsx|ts|tsx)'],
  features: {
    // storyStoreV7: false, // 👈 Opt out of on-demand story loading
  },
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-mdx-gfm',
    '@storybook/preset-scss',
    '@storybook/addon-docs'
  ],
  docs: {
    autodocs: 'tag'
  },
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  async viteFinal(config, options) {
    // const viteConfig = await loadConfigFromFile(
    //   path.resolve(__dirname, "../vite.config.ts") as any
    // )

    // const userConfig = viteConfig?.config as UserConfig;

    // return mergeConfig(config, {
    //   ...userConfig,
    //   resolve: {
    //     alias: [
    //       {
    //         find: "@",
    //         replacement: path.resolve(__dirname, "../src"),
    //       },
    //     ],
    //   },
    // });
    return config;
  },
}
export default config
