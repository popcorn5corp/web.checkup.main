<script setup lang="ts" name="Accordion">
import { Collapse } from 'ant-design-vue'
import { ref } from 'vue'
import type { AccordionProps } from '../types'
import AccordionPanel from './AccordionPanel.vue'

const props = defineProps<AccordionProps>()
const emit = defineEmits(['change'])
const activeKey = ref(props.activeKey)

const onChange = (key: string[]) => {
  emit('change', key)
}
</script>

<template>
  <div class="accordian-container" :style="style">
    <template v-if="items">
      <Collapse
        v-for="(item, index) in items"
        v-model:activeKey="activeKey"
        :expand-icon-position="expandIconPosition"
        :key="index"
        :bordered="bordered"
        :ghost="ghost"
        @change="onChange"
      >
        <AccordionPanel :key="index" :header="item.title">
          <slot name="content" :item="item"></slot>
          <template #extra><slot name="extra"></slot></template>
        </AccordionPanel>
      </Collapse>
    </template>

    <Collapse
      v-else
      v-model:activeKey="activeKey"
      :expand-icon-position="expandIconPosition"
      :bordered="bordered"
      :ghost="ghost"
    >
      <slot></slot>
    </Collapse>
  </div>
</template>
