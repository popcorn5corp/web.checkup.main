<script setup lang="ts" name="TableSegmentButton">
import { ref } from 'vue';
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
  <Segmented v-model:value="value" :options="options">
    <template #label="{ value: val, payload = {} }">
      <div style="padding: 4px 4px">
        <template v-if="payload.icon">
          <a-avatar>
            <template #icon>
              <component :is="payload.icon" />
            </template>
          </a-avatar>
        </template>
      </div>
    </template>
  </Segmented>
</template>
<style lang="scss" scoped>
:deep(.ant-avatar) {
  background: transparent;
  color: rgb(4, 17, 29);
  font-size: 17px !important;
}

:deep(.ant-segmented),
:deep(.ant-input-affix-wrapper) {
  border-radius: 9px !important;
}

:deep(.ant-segmented-item-selected, ) {
  border-radius: 7px;
}
</style>