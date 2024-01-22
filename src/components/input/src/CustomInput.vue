<template>
  <div class="custom-input-container">
    <template v-if="props.type === 'password'">
      <Input.Password
        :value="inputValue"
        v-bind="props"
        class="custom-input"
        :class="[isActive && 'active', isColored && 'colored']"
        @focus="onFocus"
        @focusout="onFocusout"
        @input="onInput"
      />
    </template>
    <template v-else>
      <Input
        :value="inputValue"
        v-bind="props"
        class="custom-input"
        :class="[isActive && 'active', isColored && 'colored']"
        @focus="onFocus"
        @focusout="onFocusout"
        @input="onInput"
      />
    </template>
    <label class="input-label">{{ props.label }}</label>
  </div>
</template>

<script setup lang="ts" name="CustomInput">
import { Input } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import type { InputProps } from '../types'

const emit = defineEmits('update:value')

const props = defineProps<InputProps>()
const {
  config: { theme }
} = useProjectConfigStore()

const themeColorStyle = computed<CSSProperties>(() => {
  return {
    color: theme.primaryColor
  }
})

const isActive = ref(false)
const isColored = ref(false)
const inputValue = ref()

;(async () => {
  inputValue.value = props.value
  if (inputValue.value) isActive.value = true
})()

const onFocus = () => {
  isActive.value = true
  isColored.value = true
}

const onFocusout = () => {
  if (!inputValue.value) isActive.value = false
  isColored.value = false
}

const onInput = (e: Event) => {
  const input = (e.target as HTMLInputElement).value
  inputValue.value = input
}
</script>

<style lang="scss" scoped>
.custom-input-container {
  margin: 10px 0;
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

.custom-input.active ~ label {
  top: 0;
  left: -5px;
  transform: translateY(-45%) scale(0.9);
  background-color: $color-white;
  padding: 0 5px;
  z-index: 99;
}
.custom-input.active.colored ~ label {
  color: v-bind('themeColorStyle.color') !important;
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
