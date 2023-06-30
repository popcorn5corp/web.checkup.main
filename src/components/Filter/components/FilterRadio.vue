<script setup>
import { ref } from 'vue'

const value = ref(1)
</script>
<template>
  <a-radio-group v-model:value="value">
    <a-radio :value="1">Option A</a-radio>
    <a-radio :value="2">Option B</a-radio>
    <a-radio :value="3">Option C</a-radio>
    <a-radio :value="4">
      More...
      <a-input v-if="value === 4" style="width: 100px; margin-left: 10px" />
    </a-radio>
  </a-radio-group>
  <a-divider />
</template>
<style lang="scss" scoped>
.ant-radio-group {
  margin: 0 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  :deep(.ant-radio-wrapper) {
    padding: 1rem;
    &:hover {
      background: rgba(229, 232, 235, 0.2);
      border-radius: 10px;
      cursor: pointer;
    }
  }

  :deep(:where(.css-dev-only-do-not-override-16iczrm).ant-checkbox .ant-checkbox-inner:after) {
    width: 5.714286px !important;
    height: 14.142857px !important;
    top: 40% !important;
  }

  :deep(.ant-checkbox-inner) {
    height: 24px !important;
    width: 24px !important;
  }
}

.ant-divider {
  margin: 6px 0;
}
</style>
