<template>
  <Layout.Header class="layout-header" :style="headerStyle">
    <Space :size="20">
      <slot>
        <Space :size="20">
          <span class="menu-fold" @click="setCollapse(!props.collapsed)">
            <template v-if="getSettings.isMobile">
              <font-awesome-icon :icon="['fas', 'bars']" style="font-size: 16px" />
            </template>
            <template v-else>
              <template v-if="collapsed">
                <font-awesome-icon :icon="['fas', 'angles-right']" />
              </template>
              <template v-else>
                <font-awesome-icon :icon="['fas', 'angles-left']" />
              </template>
            </template>

            <!-- <component :is="props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" /> -->
          </span>
        </Space>
      </slot>
      <template v-if="!getSettings.isMobile">
        <RollingText :list="rollingList" :width="450">
          <template #default="{ marquee }">
            <span>{{ marquee.title }} <Tag v-if="marquee.isNew" color="yellow">New</Tag> </span>
          </template>
        </RollingText>
      </template>
    </Space>
    <div style="display: flex; align-items: center; gap: 0.1rem">
      <ThemeToggle />
      <Space :size="20">
        <UserDropdown />
      </Space>
    </div>
  </Layout.Header>
</template>

<script lang="ts" setup name="LayoutHeader">
import { Layout, Space, Tag } from 'ant-design-vue'
import { type CSSProperties, computed, unref } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import { useTheme } from '@/hooks/useTheme'
// import { MenuFoldOutlined, MenuUnfoldOutlined } from '@/components/icons'
import { ThemeToggle } from '@/components/theme-toggle'
import { type HeaderProps, rollingList } from '../types'
import RollingText from './components/RollingText.vue'
import UserDropdown from './components/UserDropdown.vue'


defineEmits(['update:collapsed'])
const props = withDefaults(defineProps<HeaderProps>(), {})

const { getTheme } = useTheme()
const { setCollapse, getSettings } = useAppStore()

const headerStyle = computed<CSSProperties>(() => {
  const { themeName, menuThemeName, menuPosition } = unref(getTheme)
  const isDarkAndTopMenu =
    themeName === 'dark' || (menuThemeName === 'dark' && menuPosition === 'top')

  return {
    backgroundColor: isDarkAndTopMenu ? '' : '#fff',
    color: isDarkAndTopMenu ? '#fff' : ''
  }
})
</script>

<style lang="scss" scoped>
.layout-header {
  position: sticky;
  top: 0;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  line-height: 35px;

  * {
    cursor: pointer;
  }

  .scroller {
    height: 1.5em;
    line-height: 1.2em;
    position: relative;
    overflow: hidden;
    width: 500px;
  }

  .scroller > span {
    position: absolute;
    top: 0;
    animation: slide 10s infinite;
    font-weight: 500;
  }

  @keyframes slide {
    0% {
      top: 0;
    }

    25% {
      top: -1.2em;
    }

    50% {
      top: -2.4em;
    }

    // 75% {
    //   top: -3.6em;
    // }
  }
}
</style>
