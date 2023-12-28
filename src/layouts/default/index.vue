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

    <Layout class="layout-main">
      <!-- Page Header 영역 -->
      <LayoutHeader :collapsed="collapsed" :theme="getTheme">
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
      </LayoutHeader>

      <LayoutTabs />

      <!-- Page Content 영역 -->
      <Layout.Content class="layout-content" :class="getDarkModeClass">
        <div class="title">{{ $route.meta.title }}</div>

        <Divider />

        <div class="content-start" :class="[$route.name as string + '-content']">
          <slot></slot>
          <!-- <div class="layer">상세영역</div> -->
        </div>
      </Layout.Content>
      <!-- <LayoutFooter /> -->
    </Layout>

    <Tour
      :open="tourStore.getMode"
      :steps="tourStore.getStepInfo"
      @change="onChange"
      @close="handleOpen(false)"
    >
      <template #indicatorsRender="{ current, total }">
        <span>{{ current + 1 }} / {{ total }}</span>
      </template>
    </Tour>

    <CircularMenu />
  </Layout>
</template>
<script setup lang="ts" name="LayoutDefault">
import { Divider, Layout, Tour } from 'ant-design-vue'
import { type CSSProperties, computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { useTourStore } from '@/stores/modules/tour'
import { Header as LayoutHeader } from '@/components/header'
import { Logo } from '@/components/logo'
import { Menu as AsideMenu } from '@/components/menu'
import { menus } from '@/components/menu/src/mock'
// import LayoutFooter from '../components/LayoutFooter.vue'
import LayoutTabs from '../components/LayoutTabs.vue'
import CircularMenu from './components/CircularMenu.vue'

const { config } = useProjectConfigStore()
const tourStore = useTourStore()
const collapsed = computed<boolean>(() => config.isCollapse)
const asiderWidth = computed(() => (collapsed.value ? 80 : 220))
const getTheme = computed(() => (config.theme.navTheme === 'light' ? 'light' : 'dark'))
const getDarkModeClass = computed(() => ({ 'dark-mode': config.theme.navTheme === 'realDark' }))
const isSideMenu = computed(() => config.theme.menuPosition === 'sidemenu')
const router = useRouter()
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

const mainStyles = computed<{ size: CSSProperties }>(() => {
  const {
    theme: { menuPosition },
    isCollapse
  } = config
  return {
    size: {
      width:
        menuPosition === 'topmenu'
          ? '100%'
          : isCollapse
          ? 'calc(100% - 80px)'
          : 'calc(100% - 220px)',
      paddingLeft: menuPosition === 'topmenu' ? '0' : isCollapse ? '80px' : '220px'
    }
  }
})

/**
 * 온보딩 관련 코드
 */
const open = ref(false)

const onChange = (current) => {
  console.log(current)
  if (current === 2) {
    router.push({ name: 'samples-dynamic-table' })
  }
}

const handleOpen = (value) => {
  // console.log(value)
  tourStore.handleMode()
}
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
$header-height: 55px;
$tab-margin-top: 2px;
.layout-default {
  display: flex;
  height: 100vh;
  // overflow: hidden;
  .layout-sider {
    position: fixed;
    z-index: 998;
    height: 100%;
    .ant-menu-root {
      padding-bottom: 30px;
    }
  }

  :deep(.logo) {
    padding: v-bind('logoStyles.logo.padding');
    height: 95px;

    img {
      width: v-bind('logoStyles.img.width');
    }
  }
  .layout-main {
    width: v-bind('mainStyles.size.width');
    margin-left: v-bind('mainStyles.size.paddingLeft');
    overflow: auto;
    background: $color-white;
  }
  .layout-header {
    height: $header-height;
    overflow-x: auto;
    overflow-y: hidden;
    z-index: 99;
    .header-menu {
      min-width: 100px;
    }
  }
  :deep(.tabs-container) {
    position: sticky;
    top: $header-height + $tab-margin-top - 2px;
    z-index: 99;
    background: $color-white;
  }

  .layout-content {
    padding: 1rem;
    min-height: calc(100vh - 90px);

    .title {
      font-size: 1.5em;
      font-weight: bold;
    }

    :deep(.ant-divider) {
      margin: 15px 0;
    }

    [class*='-content'] {
      position: static;
      height: calc(100% - 50px);
      flex: auto;

      .layer {
        width: 500px;
        background-color: rgb(247, 247, 242);
        position: absolute; /* Layer를 절대 위치로 설정하여 content-start 영역에 상대적으로 배치합니다. */
        right: 0; /* Layer를 content-start 영역의 오른쪽 끝에 배치합니다. */
        top: 0;
        z-index: 10;
        height: 100%;
        margin-right: -15px;
      }

      > :depp(div) {
        height: 100%;
      }
    }
  }

  .dark-mode {
    background: $color-realDark !important;
    color: $color-white !important;
  }
}
</style>
