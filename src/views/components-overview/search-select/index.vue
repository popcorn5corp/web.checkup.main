<template>
  <div class="components-overview-search-select-container">
    <ImgSearchSelect />

    <DefaultSearchSelect />
  </div>
</template>

<script lang="ts" setup name="ComponentsOverviewSearchSelect">
import DefaultSearchSelect from './components/DefaultSearchSelect.vue'
import ImgSearchSelect from './components/ImgSearchSelect.vue'
</script>

<style scoped lang="scss">
.components-overview-search-select-container {
  div {
    margin-bottom: 10px;
  }
}
</style>
