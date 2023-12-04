<template>
  <Layout class="layout-pure">
    <RouterView />
  </Layout>
</template>

<script lang="ts" setup>
import { Layout } from 'ant-design-vue'
</script>

<style lang="scss">
.layout-pure {
  min-height: 100vh;
}
</style>
