<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";

import Button from "@/stories/Button/Button.vue";
import { FileExcelOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <main>
    <TheWelcome />

    <Button label="button">
      <template #icon>
        <FileExcelOutlined />
      </template>
    </Button>
  </main>
</template>
