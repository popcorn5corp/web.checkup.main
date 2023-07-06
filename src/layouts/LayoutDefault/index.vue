<template>
  <Layout class="layout-default">
    <!-- <a id="btn-collapse" class="sidebar-collapser"><i class="ri-arrow-left-s-line"></i></a> -->
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

      <Layout.Content
        class="layout-content"
        :style="{ backgroundColor: getTheme === 'dark' ? '#001529' : '' }"
      >
        <slot></slot
      ></Layout.Content>
      <PageFooter />
    </Layout>

    <div id="circularMenu" class="circular-menu circular-menu-left active">
      <a
        class="floating-btn"
        onclick="document.getElementById('circularMenu').classList.toggle('active');"
      >
        <i class="fa fa-bars"></i>
      </a>

      <menu class="items-wrapper">
        <a href="#" class="menu-item"><font-awesome-icon :icon="['fa', 'user-secret']" /></a>
        <a href="#" class="menu-item"><font-awesome-icon :icon="['fa', 'user-secret']" /></a>
        <a href="#" class="menu-item"><font-awesome-icon :icon="['fa', 'user-secret']" /></a>
        <a href="#" class="menu-item"><font-awesome-icon :icon="['fa', 'user-secret']" /></a>
      </menu>
    </div>
  </Layout>
</template>
<script setup lang="ts" name="Layout">
import { computed, watch } from 'vue'
import { Layout } from 'ant-design-vue'
import Logo from '../components/Logo/index.vue'
import AsideMenu from '../components/Menu/index.vue'
import PageHeader from '../components/Header/index.vue'
import PageFooter from '../components/Footer/index.vue'
import PageTabs from '../components/Tabs/index.vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'

const { config } = useProjectConfigStore()
const collapsed = computed<boolean>(() => config.isCollapse)
const asiderWidth = computed(() => (collapsed.value ? 80 : 220))
const getTheme = computed(() => (config.theme.navTheme === 'light' ? 'light' : 'dark'))

watch(
  () => getTheme.value,
  (theme) => {
    console.log(theme)
  }
)
</script>
<style lang="scss" scoped>
.circular-menu {
  position: fixed;
  bottom: 1em;
  right: 1em;
}

.circular-menu .floating-btn {
  display: block;
  width: 3.5em;
  height: 3.5em;
  border-radius: 50%;
  background-color: hsl(4, 98%, 60%);
  box-shadow: 0 2px 5px 0 hsla(0, 0%, 0%, 0.26);
  color: hsl(0, 0%, 100%);
  text-align: center;
  line-height: 3.9;
  cursor: pointer;
  outline: 0;
}

.circular-menu.active .floating-btn {
  box-shadow: inset 0 0 3px hsla(0, 0%, 0%, 0.3);
}

.circular-menu .floating-btn:active {
  box-shadow: 0 4px 8px 0 hsla(0, 0%, 0%, 0.4);
}

.circular-menu .floating-btn i {
  font-size: 1.3em;
  transition: transform 0.2s;
}

.circular-menu.active .floating-btn i {
  transform: rotate(-45deg);
}

.circular-menu:after {
  display: block;
  content: ' ';
  width: 3.5em;
  height: 3.5em;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: -2;
  background-color: hsl(4, 98%, 60%);
  transition: all 0.3s ease;
}

.circular-menu.active:after {
  transform: scale3d(5.5, 5.5, 1);
  transition-timing-function: cubic-bezier(0.68, 1.55, 0.265, 1);
}

.circular-menu .items-wrapper {
  padding: 0;
  margin: 0;
}

.circular-menu .menu-item {
  position: absolute;
  top: 0.2em;
  right: 0.2em;
  z-index: -1;
  display: block;
  text-decoration: none;
  color: hsl(0, 0%, 100%);
  font-size: 1em;
  width: 3em;
  height: 3em;
  border-radius: 50%;
  text-align: center;
  line-height: 3;
  background-color: hsla(0, 0%, 0%, 0.1);
  transition: transform 0.3s ease, background 0.2s ease;
}

.circular-menu .menu-item:hover {
  background-color: hsla(0, 0%, 0%, 0.3);
}

.circular-menu.active .menu-item {
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.circular-menu.active .menu-item:nth-child(1) {
  transform: translate3d(1em, -7em, 0);
}

.circular-menu.active .menu-item:nth-child(2) {
  transform: translate3d(-3.5em, -6.3em, 0);
}

.circular-menu.active .menu-item:nth-child(3) {
  transform: translate3d(-6.5em, -3.2em, 0);
}

.circular-menu.active .menu-item:nth-child(4) {
  transform: translate3d(-7em, 1em, 0);
}

/**
 * The other theme for this menu
 */

.circular-menu.circular-menu-left {
  right: auto;
  left: 1em;
}

.circular-menu.circular-menu-left .floating-btn {
  background-color: hsl(217, 89%, 61%);
}

.circular-menu.circular-menu-left:after {
  background-color: hsl(217, 89%, 61%);
}

.circular-menu.circular-menu-left.active .floating-btn i {
  transform: rotate(90deg);
}

.circular-menu.circular-menu-left.active .menu-item:nth-child(1) {
  transform: translate3d(-1em, -7em, 0);
}

.circular-menu.circular-menu-left.active .menu-item:nth-child(2) {
  transform: translate3d(3.5em, -6.3em, 0);
}

.circular-menu.circular-menu-left.active .menu-item:nth-child(3) {
  transform: translate3d(6.5em, -3.2em, 0);
}

.circular-menu.circular-menu-left.active .menu-item:nth-child(4) {
  transform: translate3d(7em, 1em, 0);
}
.layout-default {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .sidebar-collapser {
    -webkit-transition: left, right, 0.3s;
    transition: left, right, 0.3s;
    position: fixed;
    left: calc(250px - 20px);
    top: 40px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #00829f;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 1.2em;
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
    z-index: 111;
    cursor: pointer;
    color: white;
    -webkit-box-shadow: 1px 1px 4px #0c1e35;
    box-shadow: 1px 1px 4px #0c1e35;
  }

  .ant-layout {
    overflow: hidden;
  }

  .layout-content {
    padding: 1rem;
    flex: none;
    height: calc(100vh - 90px);
    background: white;
  }
}
</style>
