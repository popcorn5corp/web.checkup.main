<template>
  <div class="accordian-container" :style="style">
    <template v-if="items">
      <Collapse
        v-bind="{ ...props }"
        v-for="(item, index) in items"
        v-model:activeKey="activeKey"
        :key="index"
        @change="onChange"
      >
        <AccordionPanel :showArrow="showArrow" :key="index">
          <template #header>{{ item.title }}</template>
          <slot name="content" :item="item"></slot>
          <template #extra><slot name="extra"></slot></template>
        </AccordionPanel>

        <!-- 아이콘 -->
        <template #expandIcon="{ isActive }">
          <slot name="expandIcon" :isActive="isActive"></slot>
        </template>
      </Collapse>
    </template>

    <Collapse v-else v-bind="{ ...props }" v-model:activeKey="activeKey">
      <slot></slot>
    </Collapse>
  </div>
</template>

<script setup lang="ts" name="Accordion">
import { Collapse } from 'ant-design-vue'
import { computed, ref, watch } from 'vue'
import { useDynamicTableContext } from '@/components/dynamic-table/hooks/useDynamicTableContext'
import type { CollapseProps } from '../types'
import AccordionPanel from './AccordionPanel.vue'

const props = defineProps<CollapseProps>()
const emit = defineEmits(['change'])

const activeKey = ref(props.activeKey)

const dynamicTable = useDynamicTableContext()
const selectedFilterItems = computed(() => dynamicTable.getFilterFormItems())

const onChange = (key: Key | Key[]) => {
  emit('change', key)
  console.log(key)
}
</script>
