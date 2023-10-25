<template>
  <Layout class="layout-default">
    <!-- Page Side 영역 -->
    <Layout.Sider
      v-if="config.theme.menuPosition === 'sidemenu'"
      class="layout-sider"
      v-model:collapsed="collapsed"
      :width="asiderWidth"
      :trigger="null"
      collapsible
      :theme="getTheme"
    >
      <Logo :imgPath="imgPath" />

      <!-- Side Menu 영역 -->
      <AsideMenu
        :items="menus"
        :collapsed="collapsed"
        :theme="getTheme"
        :mode="'inline'"
        :isSide="isSideMenu"
      />
    </Layout.Sider>

    <Layout>
      <!-- Page Header 영역 -->
      <PageHeader :collapsed="collapsed" :theme="getTheme">
        <template v-if="config.theme.menuPosition === 'topmenu'" #default>
          <Logo :imgPath="imgPath" />

          <!-- Header Menu 영역 -->
          <div class="header-menu">
            <AsideMenu
              :items="menus"
              :collapsed="collapsed"
              :theme="getTheme"
              :isSide="isSideMenu"
            />
          </div>
        </template>
      </PageHeader>

      <PageTabs />

      <!-- Page Content 영역 -->
      <Layout.Content class="layout-content" :class="getDarkModeClass">
        <div class="title">{{ $route.meta.title }}</div>

        <Divider />
        <slot></slot>
      </Layout.Content>
      <PageFooter />
    </Layout>

    <CircularMenu />
  </Layout>
</template>
<script setup lang="ts" name="LayoutDefault">
import { Divider, Layout } from 'ant-design-vue'
import { type CSSProperties, computed, onMounted } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { Header as PageHeader } from '@/components/header'
import { Logo } from '@/components/logo'
import { Menu as AsideMenu } from '@/components/menu'
import { menus } from '@/components/menu/src/mock'
import PageFooter from '../components/Footer/index.vue'
import PageTabs from '../components/Tabs/index.vue'
import CircularMenu from './components/CircularMenu.vue'

const { config } = useProjectConfigStore()
const collapsed = computed<boolean>(() => config.isCollapse)
const asiderWidth = computed(() => (collapsed.value ? 80 : 220))
const getTheme = computed(() => (config.theme.navTheme === 'light' ? 'light' : 'dark'))
const getDarkModeClass = computed(() => ({ 'dark-mode': config.theme.navTheme === 'realDark' }))
const isSideMenu = computed(() => config.theme.menuPosition === 'sidemenu')
const imgPath = computed(
  () => new URL(`/src/assets/images/${config.theme.logoFileName}`, import.meta.url).href
)
const logoStyles = computed<{ logo: CSSProperties; img: CSSProperties }>(() => {
  return {
    logo: {
      padding: config.isCollapse ? '10px' : ''
    },
    img: {
      width: config.isCollapse ? '60px' : '220px'
    }
  }
})

onMounted(() => {
  setTimeout(() => {
    document.getElementById('circularMenu')?.classList.add('active')
  }, 300)

  setTimeout(() => {
    document.getElementById('circularMenu')?.classList.remove('active')
  }, 2000)
})
</script>
<style lang="scss" scoped>
.layout-default {
  display: flex;
  height: 100vh;
  overflow: hidden;

  // .sidebar-collapser {
  //   -webkit-transition: left, right, 0.3s;
  //   transition: left, right, 0.3s;
  //   position: fixed;
  //   left: calc(250px - 20px);
  //   top: 40px;
  //   width: 20px;
  //   height: 20px;
  //   border-radius: 50%;
  //   background-color: #00829f;
  //   display: -webkit-box;
  //   display: -ms-flexbox;
  //   display: flex;
  //   -ms-flex-align: center;
  //   -webkit-box-align: center;
  //   align-items: center;
  //   -webkit-box-pack: center;
  //   -ms-flex-pack: center;
  //   justify-content: center;
  //   font-size: 1.2em;
  //   -webkit-transform: translateX(50%);
  //   transform: translateX(50%);
  //   z-index: 111;
  //   cursor: pointer;
  //   color: white;
  //   -webkit-box-shadow: 1px 1px 4px #0c1e35;
  //   box-shadow: 1px 1px 4px #0c1e35;
  // }

  :deep(.logo) {
    padding: v-bind('logoStyles.logo.padding');
    height: 95px;

    img {
      width: v-bind('logoStyles.img.width');
    }
  }

  .ant-layout {
    // overflow: hidden;
    overflow-y: scroll;
  }

  .layout-header {
    .header-menu {
      max-width: 800px;
    }
  }

  .layout-content {
    padding: 1rem;
    flex: none;
    // height: calc(100vh - 90px);
    min-height: calc(100vh - 90px);
    background: $color-white;

    .title {
      font-size: 1.5em;
      font-weight: bold;
    }

    :deep(.ant-divider) {
      margin: 15px 0;
    }
  }

  .dark-mode {
    background: $color-realDark !important;
    color: $color-white !important;
  }
}
</style>
