<template>
  <AppProvider>
    <LayoutContainer />
  </AppProvider>
</template>
<script setup lang="ts" name="App">
import LayoutContainer from '@/layouts/index.vue'
import AppProvider from './AppProvider.vue'
</script>
