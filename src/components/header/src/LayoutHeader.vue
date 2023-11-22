<template>
  <Layout.Header :style="headerStyle" class="layout-header">
    <Space :size="20">
      <slot>
        <Space :size="20">
          <span class="menu-fold" @click="setCollapse(!props.collapsed)">
            <component :is="props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined" />
          </span>
        </Space>
      </slot>

      <RollingText :list="rollingList" :width="450">
        <template #default="{ marquee }">
          <span>{{ marquee.title }} <Tag v-if="marquee.isNew" color="yellow">New</Tag> </span>
        </template>
      </RollingText>
    </Space>

    <Space :size="20">
      <UserDropdown />
    </Space>
  </Layout.Header>
</template>

<script lang="ts" setup name="LayoutHeader">
import { Layout, Space, Tag } from 'ant-design-vue'
import { type CSSProperties, computed } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@/components/icons'
import { type HeaderProps, rollingList } from '../types'
import RollingText from './components/RollingText.vue'
import UserDropdown from './components/UserDropdown.vue'

const emit = defineEmits(['update:collapsed'])
const props = withDefaults(defineProps<HeaderProps>(), {})

const { config, setCollapse } = useProjectConfigStore()

const headerStyle = computed<CSSProperties>(() => {
  const {
    theme: { navTheme, menuPosition }
  } = config

  return {
    backgroundColor:
      navTheme === 'realDark' || (navTheme === 'dark' && menuPosition === 'topmenu')
        ? ''
        : 'rgba(255, 255, 255, 0.85)',
    color: navTheme === 'dark' && menuPosition === 'topmenu' ? 'rgba(255, 255, 255, 0.85)' : ''
  }
})
</script>

<style lang="scss" scoped>
.layout-header {
  position: sticky;
  top: 0;
  display: flex;
  // height: 55px;
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
