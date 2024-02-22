<template>
  <Drawer
    v-model:open="open"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    style="color: red"
    title="Basic Drawer"
    placement="right"
    @after-open-change="emits('update:open', $event)"
  >
    <slot name="drawerHeader" />
    <slot name="drawerContent" />
  </Drawer>
</template>
<script setup lang="ts" name="Drawer">
import { Drawer } from 'ant-design-vue'
import { ref, watch } from 'vue'

interface DrawerProps {
  open: boolean
}

const emits = defineEmits(['update:open'])
const props = defineProps<DrawerProps>()
const open = ref<boolean>(false)

watch(
  () => props.open,
  () => {
    open.value = props.open
  }
)
</script>
<style lang="scss" scoped></style>
