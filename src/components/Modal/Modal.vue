<template>
  <div></div>
</template>

<script lang="ts" setup name="Modal">
import { Modal } from 'ant-design-vue'
import { computed } from 'vue'

interface Props {
  label: string
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped></style>
