<template>
  <div class="custom-input-container">
    <template v-if="props.type === 'password'">
      <Input.Password
        v-model:value="inputValue"
        v-bind="props"
        class="custom-input"
        :class="isActive && 'active'"
        @focus="isActive = true"
        @focusout="inputValue || (isActive = false)"
      />
    </template>
    <template v-else>
      <Input
        v-model:value="inputValue"
        v-bind="props"
        class="custom-input"
        :class="isActive && 'active'"
        @focus="isActive = true"
        @focusout="inputValue || (isActive = false)"
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
const inputValue = ref()

defineExpose({
  inputValue
})
</script>

<style lang="scss" scoped>
.custom-input-container {
  margin: 1rem 0;
  position: relative;

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

.custom-input.active,
input:valid {
  outline: none;
  border: 1.5px solid v-bind('themeColorStyle.color') !important;
}

.custom-input.active ~ label,
input:valid ~ label {
  top: 0;
  left: -5px;
  transform: translateY(-45%) scale(0.9);
  background-color: $color-white;
  padding: 0 5px;
  color: v-bind('themeColorStyle.color') !important;
  z-index: 99;
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
