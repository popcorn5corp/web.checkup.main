<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";

import Button from "@/stories/Button/Button.vue";
import { PlusCircleOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <main>
    <TheWelcome />

    <Button label="button">
      <template #icon><PlusCircleOutlined /></template>
    </Button>
  </main>
</template>
