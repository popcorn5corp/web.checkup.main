<template>
  <div class="custom-select-container">
    <Select
      v-model:value="selectValue"
      class="custom-select"
      :options="options"
      :placeholder="placeholder"
      :allowClear="allowClear"
      :style="{ width: width ?? '100%' }"
      :class="[isActive && 'active', isColored && 'colored']"
      :loading="loading"
      @focus="onFocus"
      @focusout="onFocusout"
      @change="onChange"
      @select="onSelect"
    >
      <SelectOption v-for="opt in options" :key="opt.value" :value="opt.value">{{
        opt.label
      }}</SelectOption>
    </Select>
    <label class="select-label">{{ label }}</label>
  </div>
</template>

<script setup lang="ts" name="CustomSelect">
import { Select, SelectOption } from 'ant-design-vue'
import { type CSSProperties, computed, ref, unref } from 'vue'
import { useTheme } from '@/hooks/useTheme'
import type { SelectProps } from '../types'

const emit = defineEmits(['update:value'])
const props = withDefaults(defineProps<SelectProps>(), {})

const { getTheme } = useTheme()
const themeColorStyle = computed<CSSProperties>(() => {
  return {
    color: unref(getTheme).primaryColor
  }
})

const isActive = ref(false)
const isColored = ref(false)
const selectValue = ref()

;(async () => {
  selectValue.value = props.value
  if (selectValue.value) isActive.value = true
})()

const onFocus = () => {
  isActive.value = true
  isColored.value = true
}

const onFocusout = () => {
  if (!selectValue.value) isActive.value = false
  isColored.value = false
}

const onChange: SelectProps['onChange'] = (value, options) => {
  selectValue.value = value
  emit('update:value', options)
}

defineExpose({
  selectValue
})
</script>

<style lang="scss" scoped>
.custom-select-container {
  margin: 10px 0;
  position: relative;
  background: inherit;

  .custom-select {
    transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);
    :deep(.ant-select-selector) {
      height: auto;
      padding: 5px 13px;
      border: 1.5px solid $color-gray-5;
      border-radius: 8px;
    }
    .ant-select-selector:after {
      line-height: 1;
    }
    .ant-select-selection-search-input {
      height: auto;
    }
    :deep(.ant-select-arrow) {
      font-size: 13px;
    }
    :deep(.ant-select-clear) {
      font-size: 13px;
      margin-top: -7px;
      inset-inline-end: 13px;
    }
  }
  .custom-select:hover {
    :deep(.ant-select-selector) {
      border-color: $color-gray-5 !important;
    }
  }
  .select-label {
    position: absolute;
    top: 50%;
    left: 0;
    margin-left: 12px;
    pointer-events: none;
    transform: translateY(-51%);
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    color: $color-gray-5;
    background: transparent;
    z-index: 99;
  }

  .custom-select.active.colored {
    :deep(.ant-select-selector) {
      border: 1.5px solid v-bind('themeColorStyle.color') !important;
    }
  }

  .custom-select.active ~ label {
    top: 0;
    left: -5px;
    transform: translateY(-45%) scale(0.9);
    padding: 0 5px;
    z-index: 99;
  }
  .custom-select.active.colored ~ label {
    color: v-bind('themeColorStyle.color') !important;
  }
}

:deep(.ant-select-selection-placeholder) {
  line-height: 1;
  color: transparent;
}
.custom-select.active {
  :deep(.ant-select-selection-placeholder) {
    color: $color-gray-5;
  }
}
</style>
