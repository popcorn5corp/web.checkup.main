<template>
  <a-button
    :type="type"
    :shape="shape"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot name="icon"></slot>

    <DownloadOutlined v-if="icon === 'download'" />
    <PlusCircleOutlined v-if="icon === 'plusCircle'" />
    <FileExcelOutlined v-if="icon === 'excel'" />
    {{ label }}
  </a-button>
</template>

<script lang="ts" setup>
import type { ButtonProps } from './types';
import "./button.css";
import {
  DownloadOutlined,
  PlusCircleOutlined,
  FileExcelOutlined,
} from "@ant-design/icons-vue";

const props = defineProps<ButtonProps>();

const emit = defineEmits<{
  (e: "click"): void;
}>();
 
</script>
