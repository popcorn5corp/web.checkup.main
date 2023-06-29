<template>
  <Dropdown :trigger="['click']">
    <Button shape="round">
      {{ props.label }}
      <CaretDownOutlined />
    </Button>
    <template #overlay>
      <slot name="overlay"></slot>
    </template>
  </Dropdown>
  <!-- <a-dropdown-button :trigger="['click']">
    Submit
    <template #overlay>
      <a-menu>
        <a-menu-item key="1">Submit and continue</a-menu-item>
      </a-menu>
    </template>
    <template #icon><DownOutlined /></template>
  </a-dropdown-button> -->
</template>

<script lang="ts" setup name="Dropdown">
import { computed } from 'vue'
import { Dropdown, Button, DropdownButton } from 'ant-design-vue'
import {
  DownOutlined,
  DownSquareTwoTone,
  DownSquareFilled,
  CaretDownOutlined,
  CaretDownFilled
} from '@ant-design/icons-vue'

const {} = Dropdown

interface Props {
  label: string
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped></style>
