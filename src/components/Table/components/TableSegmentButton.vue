<script setup lang="ts" name="TableSegmentButton">
import { ref, type CSSProperties } from 'vue';
import { Segmented } from 'ant-design-vue'
import { UnorderedListOutlined, TableOutlined } from '@ant-design/icons-vue'

const value = ref('table')
const options = ref([
  {
    value: 'table',
    payload: {
      icon: UnorderedListOutlined
    }
  },
  {
    value: 'img',
    payload: {
      icon: TableOutlined
    }
  }
])
</script>
<template>
  <div class="table-segmented-button">
    <Segmented v-model:value="value" :options="options">
      <template #label="{ value: val, payload = {} }">
        <div style="padding: 4px 4px">
          <template v-if="payload.icon">
            <component :is="payload.icon" />
          </template>
        </div>
      </template>
    </Segmented>
  </div>
</template>
<style lang="scss" scoped>
.table-segmented-button {
  :deep(.ant-segmented) {
    font-size: 1rem;

    .ant-segmented-item-selected {
      border-radius: 7px;
    }
  }
}
</style>