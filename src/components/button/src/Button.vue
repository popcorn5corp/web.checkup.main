<template>
  <Button
    :class="getButtonClass"
    :size="size"
    :type="type"
    :shape="shape"
    :loading="loading"
    :style="style"
    :disabled="disabled"
    @click="onClick"
  >
    <ButtonIcon v-if="icon" :icon="icon" />
    <slot v-else name="icon"></slot>
    {{ label }}
    <slot />
  </Button>
</template>

<script setup lang="ts" name="Button">
import { Button } from 'ant-design-vue'
import { computed } from 'vue'
import type { ButtonEmits, ButtonProps } from '../types'
import ButtonIcon from './components/ButtonIcon.vue'

const emit = defineEmits<ButtonEmits>()
const props = withDefaults(defineProps<ButtonProps>(), {
  label: '',
  size: 'middle',
  shape: 'default'
})

const getButtonClass = computed(() => {
  const { size } = props
  return [
    {
      [`storybook-button--small`]: size === 'small'
    }
  ]
})

const onClick = (e: Event) => {
  emit('click', e)
}
</script>

<style lang="scss" scoped>
:deep(.ant-btn) {
  // display: flex;
  align-items: center;
  justify-content: center;
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
