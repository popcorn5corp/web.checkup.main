/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    // 'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    '@vue/prettier',
    'plugin:storybook/recommended'
  ],
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index'],
        // $schema: 'https://json.schemastore.org/prettierrc',
        // semi: false,
        // tabWidth: 2,
        // singleQuote: true,
        // printWidth: 100,
        // trailingComma: 'none'
        // printWidth: 10
        // trailingComma: 'none'
      }
    ],
    'no-unused-vars': 'off',
    'vue/no-unused-vars': 'off'
  }
}
