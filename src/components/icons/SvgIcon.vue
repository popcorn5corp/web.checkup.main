<template>
  <svg v-bind="$attrs" class="svg-icon" :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts" name="SvgIcon">
import { type CSSProperties, computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'svg-icon'
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 16
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const getStyle = computed<CSSProperties>(() => {
  const { size } = props
  const s = `${size}`.replace('px', '').concat('px')
  return {
    width: s,
    height: s
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentcolor;
}
</style>
