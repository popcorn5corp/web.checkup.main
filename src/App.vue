<template>
  <ConfigProvider
    :locale="getAntdLocale"
    :theme="{
      algorithm: themeAlgorithm,
      token: {
        colorPrimary: configTheme.primaryColor,
        fontSize: configTheme.fontSize
      }
    }"
  >
    <LayoutContainer />
  </ConfigProvider>
</template>
<script setup lang="ts" name="App">
import LayoutContainer from '@/layouts/index.vue'
import { ConfigProvider } from 'ant-design-vue'
import { theme } from 'ant-design-vue'
import { computed } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { useLocale } from '@/locales/hooks/useLocale'

const { defaultAlgorithm, darkAlgorithm, defaultSeed } = theme

// const dark = theme.darkAlgorithm({
//   ...defaultSeed
// })

// const customDarkAlgorithm: any = {
//   ...defaultSeed,
//   colorBgBase: `#282a42`,
//   colorBgContainer: `#30334d`
// }
const { config } = useProjectConfigStore()
const configTheme = computed(() => config.theme)
const customSeed = computed(() => {
  return { ...defaultSeed, colorPrimary: configTheme.value.primaryColor }
})
const mergeToken = computed(() => darkAlgorithm(customSeed.value))
const themeAlgorithm = computed(() =>
  config.theme.navTheme === 'realDark' ? customDarkAlgorithm : defaultAlgorithm
)

const { getAntdLocale } = useLocale()

const customDarkAlgorithm = () => {
  return {
    ...mergeToken.value,
    colorBgBase: 'rgba(40,42,66)',
    colorBgContainer: '#30334d',
    colorBgLayout: 'rgba(40,42,66)',
    colorBgElevated: '#30334d',
    colorBorder: '#ebebff45'
  }
}
</script>
<style lang="scss" scoped></style>

<!-- <script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
