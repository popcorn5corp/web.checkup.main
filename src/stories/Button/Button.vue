<template>
  <a-button
    :class="getButtonClass"
    v-bind="{
      ...props,
      icon: undefined
    }"
    @click="$emit('click')"
  >
    <ButtonIcon v-if="icon" :icon="icon" />
    <slot v-else name="icon"></slot>

    {{ label }}
  </a-button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import ButtonIcon from './ButtonIcon.vue'

import type { ButtonProps, ButtonEmits } from './types'

const props = defineProps<ButtonProps>()
const emit = defineEmits<ButtonEmits>()

const getButtonClass = computed(() => {
  const { size } = props
  return [
    {
      [`storybook-button--small`]: size === 'small'
    }
  ]
})
</script>

<style lang="scss" scoped>
.ant-btn {
  // display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
.storybook-button {
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
}
.storybook-button--primary {
  color: white;
  background-color: #1ea7fd;
}
.storybook-button--secondary {
  color: #333;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
}
.storybook-button--small {
  font-size: 11px;
}
.storybook-button--medium {
  font-size: 14px;
  padding: 11px 20px;
}
.storybook-button--large {
  font-size: 16px;
  padding: 12px 24px;
}
</style>
