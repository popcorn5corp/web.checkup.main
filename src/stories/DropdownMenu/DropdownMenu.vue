<template>
  <Dropdown>
    <template #overlay> </template>

    <Button>
      {{}}
      <DownOutlined />
    </Button>
  </Dropdown>
</template>

<script lang="ts" setup name="DropdownMenu">
import { computed } from 'vue'
import { Dropdown, Button } from 'ant-design-vue'
// import { Button } from '@/stories'

interface Props {
  label: string
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped></style>
