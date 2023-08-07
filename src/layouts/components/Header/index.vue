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

      <RollingText :list="rollingList" :width="400">
        <template #default="{ marquee }">
          <span>{{ marquee.title }} <a-tag v-if="marquee.isNew" color="#ffc53d">New</a-tag> </span>
        </template>
      </RollingText>

    </Space>
    <Space :size="20">
      <UserDropdown />
    </Space>
  </Layout.Header>
</template>

<script lang="ts" setup name="Header">
import { computed, ref, type CSSProperties, type PropType, watch } from 'vue'
import { Layout, Space, type MenuTheme } from 'ant-design-vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@/components/Icon'
import UserDropdown from './components/UserDropdown.vue'
import RollingText from './components/RollingText.vue'
import { rollingList } from './data/index';

const emit = defineEmits(['update:collapsed'])
const props = defineProps({
  collapsed: {
    type: Boolean
  },
  theme: {
    type: String as PropType<MenuTheme>
  }
})

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
    color: (navTheme === 'dark' && menuPosition === 'topmenu') ? 'rgba(255, 255, 255, 0.85)' : ''
  }
})

</script>

<style lang="scss" scoped>
.layout-header {
  position: sticky;
  top: 0;
  display: flex;
  height: 55px;
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

  .scroller>span {
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
