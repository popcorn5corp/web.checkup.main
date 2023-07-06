<script lang="ts" setup name="FilterDatepicker">
import { Button } from '@/components/Button'
import { ref } from 'vue'

const value1 = ref([])
</script>
<template>
  <a-range-picker v-model:value="value1" />
  <Button label="Apply" type="primary" size="large" />
  <a-divider />
</template>
<style lang="scss" scoped>
.ant-picker-range {
  margin: 1rem;
  height: 40px;
}

.ant-btn {
  margin: 0 1rem;
}
</style>
