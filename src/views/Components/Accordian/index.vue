<script setup lang="ts" name="antd">
import { SettingOutlined } from '@ant-design/icons-vue'
import { type CSSProperties, type Component, ref } from 'vue'
import { Accordion, AccordionPanel } from '@/components/accordion'
import type { FilterType } from '@/components/dynamic-table/interface'
import {
  Checkbox,
  Datepicker,
  Radio,
  RangeDatePicker,
  Select
} from '@/components/dynamic-table/src/components'
import { filterList } from '@/components/dynamic-table/src/components/mock'

const filterTypeComponents: Record<FilterType, Component> = {
  checkbox: Checkbox,
  datepicker: Datepicker,
  rangeDatePicker: RangeDatePicker,
  select: Select,
  radio: Radio
}

const customStyle: CSSProperties = 'width: 30%; font-weight: bold; font-size: 16px'

const expandIconPosition = ref<CollapseProps['expandIconPosition']>('end')
</script>

<template>
  <div>
    <!-- Accordion case 1 -->
    <Accordion :activeKey="2" expandIconPosition="start">
      <AccordionPanel
        :key="1"
        header="This is panel header 1"
        text="A dog is a type of domesticated animal. Known for its loyalty and faithfulness"
      />
      <AccordionPanel
        :key="2"
        header="This is panel header 1"
        text="A dog is a type of domesticated animal. Known for its loyalty and faithfulness"
      />
    </Accordion>

    <br />

    <!-- Accordion case 2 -->
    <Accordion :bordered="true">
      <AccordionPanel :key="1" header="This is panel header 1">
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness
      </AccordionPanel>
      <AccordionPanel :key="2" header="This is panel header 1">
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness
      </AccordionPanel>
    </Accordion>

    <br />

    <!-- Accordion case 3 -->
    <a-select v-model:value="expandIconPosition">
      <a-select-option value="start">start</a-select-option>
      <a-select-option value="end">end</a-select-option>
    </a-select>

    <Accordion :expand-icon-position="expandIconPosition">
      <AccordionPanel header="This is panel header 1">
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness
        <template #extra><SettingOutlined /></template>
      </AccordionPanel>
      <AccordionPanel header="This is panel header 2">
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness
        <template #extra><SettingOutlined /></template>
      </AccordionPanel>
    </Accordion>

    <div style="display: flex; justify-content: space-evenly; margin-top: 1rem">
      <!-- Accordion case 4 -->
      <Accordion :items="filterList" :style="customStyle" :ghost="false" bordered>
        <template #content="{ item }">
          <keep-alive>
            <component :is="filterTypeComponents[item.type as FilterType]" :item="item" />
          </keep-alive>
        </template>
      </Accordion>

      <!-- Accordion case 5 -->
      <Accordion :items="filterList" :style="customStyle" ghost>
        <template #content="{ item }">
          <keep-alive>
            <component :is="filterTypeComponents[item.type as FilterType]" :item="item" />
          </keep-alive>
        </template>
      </Accordion>
    </div>
  </div>
</template>
