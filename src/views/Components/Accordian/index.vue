<script setup lang="ts" name="antd">
import { type Component } from 'vue'
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

const customStyle = 'width: 30%; font-weight: bold; font-size: 16px'
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
    <Accordion>
      <AccordionPanel :key="1" header="This is panel header 1">
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness
      </AccordionPanel>
      <AccordionPanel :key="2" header="This is panel header 1">
        A dog is a type of domesticated animal. Known for its loyalty and faithfulness
      </AccordionPanel>
    </Accordion>

    <br />

    <!-- Accordion case 3 -->
    <Accordion :items="filterList" :style="customStyle" ghost>
      <template #content="{ item }">
        <keep-alive>
          <component :is="filterTypeComponents[item.type as FilterType]" :item="item" />
        </keep-alive>
      </template>
    </Accordion>
  </div>
</template>
