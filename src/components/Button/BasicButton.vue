<script setup lang="ts">
import { type PropType } from "vue";

// const validColors = ['primary', 'error', 'warning', 'success', ''] as const;
// type ButtonColorType = (typeof validColors)[number];
type ButtonSize = "small" | "meddle" | "large" | "";

interface Button {
  size?: ButtonSize;
  icon?: string;
  onClick: () => void;
}

const props = defineProps<Button>()

const emit = defineEmits<{
  (e: 'click'): void;
}>()


const onClick = (e: Event): void =>   {
  emit("click")
};
</script>

<template>
  <div>
    <a-button @click="onClick" :size="size">잉</a-button>
  </div>
</template>
