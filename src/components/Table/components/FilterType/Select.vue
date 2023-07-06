<script lang="ts" setup name="FilterSelect">
import { ref } from 'vue'
import { Button } from '@/components/Button'

const value1 = ref([])
</script>
<template>
  <a-select placeholder="Select" />
  <Button label="Apply" type="primary" size="large" />
  <a-divider />
</template>
<style lang="scss" scoped>
.ant-select {
  margin: 1rem;
  :deep(.ant-select-selector) {
    height: 40px !important;
    display: flex;
    align-items: center;
  }
}
.ant-btn {
  margin: 0 1rem;
}
</style>
