<template></template>

<script lang="ts" setup name="Modal">
import { computed } from 'vue'
import { Modal } from 'ant-design-vue'

interface Props {
  label: string
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped></style>
