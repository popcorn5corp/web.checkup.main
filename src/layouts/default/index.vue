<template>
  <Layout class="layout-default">
    <!-- Page Side 영역 -->
    <Layout.Sider
      class="layout-sider"
      v-if="getTheme.menuPosition === 'side'"
      :ref="(ref) => tour.setTour(1, ref as Element, TOUR_TYPE.CHECKUP_TOUR_DEMO)"
      v-model:collapsed="collapsed"
      :width="asiderWidth"
      :trigger="null"
      collapsible
      :theme="getTheme.themeName === 'dark' || getTheme.themeName === 'semiDark' ? 'dark' : 'light'"
    >
      <Logo :imgPath="imgPath" />

      <!-- Side Menu 영역 -->
      <AsideMenu
        :items="getMenus"
        :collapsed="collapsed"
        :theme="getTheme.menuThemeName"
        :mode="'inline'"
        :isSide="isSideMenu"
      />
    </Layout.Sider>

    <Layout class="layout-main">
      <!-- Page Header 영역 -->
      <LayoutHeader
        :ref="(ref) => tour.setTour(2, ref as Element, TOUR_TYPE.CHECKUP_TOUR_DEMO)"
        :collapsed="collapsed"
        :theme="getTheme.themeName === 'dark' ? 'dark' : 'light'"
      >
        <template v-if="getTheme.menuPosition === 'top'" #default>
          <Logo :imgPath="imgPath" />

          <!-- Header Menu 영역 -->
          <div class="header-menu">
            <AsideMenu
              :items="getMenus"
              :collapsed="collapsed"
              :theme="getTheme.menuThemeName"
              :isSide="isSideMenu"
            />
          </div>
        </template>
      </LayoutHeader>

      <LayoutTabs />

      <!-- Page Content 영역 -->
      <Layout.Content
        :ref="(ref) => tour.setTour(4, ref as Element, TOUR_TYPE.CHECKUP_TOUR_DEMO)"
        class="layout-content"
      >
        <div class="title">{{ $route.meta.title }}</div>

        <Divider />

        <div class="content-start" :class="[$route.name as string + '-content']">
          <slot></slot>
          <!-- <div class="layer">상세영역</div> -->
        </div>
      </Layout.Content>
      <!-- <LayoutFooter /> -->
    </Layout>

    <Tour :steps="steps" v-model:open="open" />

    <CircularMenu
      :ref="(ref) => tour.setTour(3, ref as Element, TOUR_TYPE.CHECKUP_TOUR_DEMO)"
      @tourStart="handleOpen"
    />
  </Layout>
</template>
<script setup lang="ts" name="LayoutDefault">
import { Divider, Layout } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { type CSSProperties, computed, onMounted, ref, unref, watch } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import { useTourStore } from '@/stores/modules/tour'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { useTheme } from '@/hooks/useTheme'
import { Header as LayoutHeader } from '@/components/header'
import { Logo } from '@/components/logo'
import { Menu as AsideMenu } from '@/components/menu'
import { Tour } from '@/components/tour'
import { useTour } from '@/components/tour/hooks/useTour'
import { TOUR_TYPE } from '@/components/tour/types'
import LayoutTabs from '../components/LayoutTabs.vue'
import CircularMenu from './components/CircularMenu.vue'

const { getTheme, setMenuPosition } = useTheme()
const { getSettings } = storeToRefs(useAppStore())
const { setMobile } = useAppStore()
const { getMenus } = storeToRefs(useWorkspaceStore())
const tourStore = useTourStore()
const collapsed = computed<boolean>(() => unref(getSettings).isCollapse)
const asiderWidth = computed(() => {
  const { isCollapse } = unref(getSettings)

  if (isMobile.value) {
    return 0
  } else {
    return isCollapse ? 80 : 220
  }
})
const isSideMenu = computed(() => unref(getTheme).menuPosition === 'side')
const tour = useTour()
const tourType = TOUR_TYPE.CHECKUP_TOUR
const steps = computed(() => tourStore.getTour(tourType))
const open = ref(false)
const windowWidth = ref(window.innerWidth)
const isMobile = ref(false)

const handleOpen = () => {
  open.value = true
}

const imgPath = computed(
  () => new URL(`/src/assets/images/${unref(getSettings).logoFileName}`, import.meta.url).href
)

const logoStyles = computed<{ logo: CSSProperties; img: CSSProperties }>(() => {
  const { isCollapse } = unref(getSettings)

  return {
    logo: {
      padding: isCollapse ? '10px' : ''
    },
    img: {
      width: isCollapse ? '60px' : '220px'
    }
  }
})

const mainStyles = computed<{ size: CSSProperties }>(() => {
  const { menuPosition } = unref(getTheme)
  const { isCollapse } = unref(getSettings)

  let width
  let marginLeft
  if (!isMobile.value) {
    width =
      menuPosition === 'top' ? '100%' : isCollapse ? 'calc(100% - 80px)' : 'calc(100% - 220px)'
    marginLeft = menuPosition === 'top' ? '0' : isCollapse ? '80px' : '220px'
  } else {
    width = isCollapse ? 'calc(100% - 80px)' : '100%'
    marginLeft = isCollapse ? '80px' : '0'
  }

  return {
    size: {
      width,
      marginLeft
    }
  }
})

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

function handleMobile() {
  isMobile.value = windowWidth.value < 769
}

watch(
  () => isMobile.value,
  () => {
    setMobile(isMobile.value)
    if (isMobile.value) {
      setMenuPosition('side')
    }
  },
  { immediate: true }
)

watch(
  () => windowWidth.value,
  () => {
    handleMobile()
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('resize', handleResize)

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
    margin-left: v-bind('mainStyles.size.marginLeft');
    overflow: auto;
  }
  .layout-header {
    height: $header-height;
    overflow-x: auto;
    overflow-y: hidden;
    z-index: 99;
    .header-menu {
      min-width: 105px;
    }
  }
  :deep(.tabs-container) {
    position: sticky;
    top: $header-height + $tab-margin-top - 2px;
    z-index: 99;
    background: inherit;
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
}
</style>
