<template>
  <Layout class="layout-default">
    <Layout.Sider
      v-if="config.theme.layout === 'sidemenu'"
      v-model:collapsed="collapsed"
      :width="asiderWidth"
      :trigger="null"
      collapsible
      :theme="getTheme"
      class="layout-sider"
    >
      <Logo :collapsed="collapsed" />
      <AsideMenu :collapsed="collapsed" :theme="getTheme" />
    </Layout.Sider>
    <Layout>
      <!-- <PageHeader v-model:collapsed="collapsed" :theme="getTheme"> -->
      <PageHeader :collapsed="collapsed" :theme="getTheme">
        <template v-if="config.theme.layout === 'topmenu'" #default>
          <Logo :collapsed="collapsed" />
          <AsideMenu :collapsed="collapsed" :theme="getTheme" />
        </template>
      </PageHeader>

      <PageTabs />

      <!-- <Layout.Content class="layout-content">
        <slot></slot>
      </Layout.Content> -->
      <PageFooter />
    </Layout>
  </Layout>
</template>
<script setup lang="ts" name="Layout">
import { ref, computed, onMounted } from 'vue'
import { Layout } from 'ant-design-vue'
import Logo from '../components/Logo/index.vue'
// import { TabsView } from './tabs'
import AsideMenu from '../components/Menu/index.vue'
import PageHeader from '../components/Header/index.vue'
import PageFooter from '../components/Footer/index.vue'
import PageTabs from '../components/Tabs/index.vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import Badge from '@/stories/Badge/Badge.vue'

const { config } = useProjectConfigStore()
const collapsed = computed<boolean>(() => config.isCollapse)
const asiderWidth = computed(() => (collapsed.value ? 80 : 220))
const getTheme = computed(() => (config.theme.navTheme === 'light' ? 'light' : 'dark'))
</script>
<style lang="scss" scoped>
.layout-default {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .ant-layout {
    overflow: hidden;
  }

  .layout-content {
    flex: none;
  }
}
</style>
