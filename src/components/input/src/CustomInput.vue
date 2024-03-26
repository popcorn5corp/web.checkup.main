<template>
  <div class="custom-input-container">
    <Input
      v-bind="props"
      class="custom-input"
      :class="[isActive && 'active', isColored && 'colored', isError && 'error']"
      @focus="onFocus"
      @focusout="onFocusout"
    />
    <label class="input-label">{{ props.label }}</label>
  </div>
</template>

<script setup lang="ts" name="CustomInput">
import { Input } from 'ant-design-vue'
import { type CSSProperties, computed, ref, unref, watch } from 'vue'

import { useTheme } from '@/hooks/useTheme'

import type { InputProps } from '../types'

const props = defineProps<InputProps>()
const { getTheme } = useTheme()
const themeColorStyle = computed<CSSProperties>(() => {
  return {
    color: unref(getTheme).primaryColor
  }
})

const isActive = ref(false)
const isColored = ref(false)
const isError = ref(false)

;(async () => {
  if (props.value) isActive.value = true
})()

const onFocus = () => {
  isActive.value = true
  isColored.value = true
}

const onFocusout = () => {
  if (!props.value) isActive.value = false
  isColored.value = false
}

// watch(
//   () => props,
//   () => {
//     if (props.isError) {
//       isError.value = true
//       isActive.value = true
//     } else {
//       isError.value = false
//     }
//   },
//   { immediate: true, deep: true }
// )
</script>

<style lang="scss" scoped>
.custom-input-container {
  margin-top: 10px;
  position: relative;
  background: inherit;

  .custom-input {
    padding: 10px 13px;
    border: solid 1.5px $input-border-color;
    border-radius: 8px;
    transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .input-label {
    position: absolute;
    top: 50%;
    left: 0;
    margin-left: 12px;
    pointer-events: none;
    transform: translateY(-51%);
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    color: $input-border-color;
    background: transparent;
    z-index: 99;
  }

  :deep(.ant-input-clear-icon) {
    font-size: 13px;
  }
}

.custom-input.active.colored {
  border: 1.5px solid v-bind('themeColorStyle.color') !important;
}

.custom-input.error,
.custom-input.error.active {
  border: 1.5px solid $color-feedback-error !important;
}

.custom-input.active ~ label {
  top: 0;
  left: -5px;
  transform: translateY(-45%) scale(0.9);
  padding: 0 5px;
  z-index: 99;
}

.custom-input.active.colored ~ label {
  color: v-bind('themeColorStyle.color') !important;
}

.custom-input.error ~ label,
.custom-input.error.active ~ label {
  color: $color-feedback-error !important;
}

.custom-input {
  :deep(input)::placeholder {
    color: transparent;
  }
}

.custom-input.active {
  :deep(input)::placeholder {
    color: $input-border-color;
  }
}
</style>
