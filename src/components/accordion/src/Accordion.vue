<script setup lang="ts">
import { Collapse } from 'ant-design-vue'
import { ref } from 'vue'
import type { AccordionProps } from '../interface'
import AccordionPanel from './AccordionPanel.vue'

const props = defineProps<AccordionProps>()

const activeKey = ref(props.activeKey)

const onChange = (key: Key | Key[]) => {
  // console.log(key)
}
</script>

<template>
  <div>
    <template v-if="items">
      <Collapse
        v-for="(item, index) in items"
        v-model:activeKey="activeKey"
        :expand-icon-position="expandIconPosition"
        :key="index"
        :bordered="bordered"
        :ghost="ghost"
        :style="style"
        @change="onChange"
      >
        <AccordionPanel :key="index" :header="item.title">
          <slot name="content" :item="item"></slot>
        </AccordionPanel>
      </Collapse>
    </template>

    <Collapse
      v-else
      v-model:activeKey="activeKey"
      :expand-icon-position="expandIconPosition"
      :bordered="bordered"
      :ghost="ghost"
      :style="style"
    >
      <slot></slot>
    </Collapse>
  </div>
</template>
