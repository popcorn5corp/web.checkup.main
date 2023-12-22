<template>
  <div class="user-account">
    <MenuHeader :collapsed="false" />
  </div>
</template>
<script lang="ts" setup name="UserAccount">
import MenuHeader from '@/components/menu/src/components/MenuHeader.vue'
</script>
<style lang="scss" scoped>
.user-account {
  :deep(.menu-header) {
    .user-preview .info {
      .name {
        color: $text-color;
      }

      .email {
        color: $color-gray-7;
      }
    }
  }
}
</style>
