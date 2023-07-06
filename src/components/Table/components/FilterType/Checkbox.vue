<script lang="ts" setup name="FilterCheckbox">
import { ref } from 'vue'

const value1 = ref([])
const userName = ref(null)
</script>
<template>
  <div class="filter-input">
    <a-input v-model:value="userName" placeholder="Basic usage">
      <template #prefix>
        <font-awesome-icon style="color: #d9d9d9" :icon="['fas', 'magnifying-glass']" />
      </template>
      <template #suffix>
        <a-tooltip title="Extra information">
          <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
        </a-tooltip>
      </template>
    </a-input>
  </div>
  <a-checkbox-group
    v-model:value="value1"
    name="checkboxgroup"
    :options="[
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' }
    ]"
  ></a-checkbox-group>
  <a-divider />
</template>
<style lang="scss" scoped>
.filter-input {
  margin: 9px 16px -13px;
  :deep(.ant-input) {
    height: 28px;
  }
}
.ant-checkbox-group {
  width: 100%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;

  :deep(.ant-checkbox-group-item) {
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
