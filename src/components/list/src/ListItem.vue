<template>
  <div class="list-item-wrapper">
    <ListItem>
      <template #actions>
        <slot name="actions" />
      </template>
      <slot />
    </ListItem>
  </div>
</template>

<script setup lang="ts" name="ListItem">
import { ListItem } from 'ant-design-vue'
</script>
