<template>
  <div class="logo">
    <!-- <img src="@/assets/images/logo.png" alt="" /> -->
    <h2 v-show="!collapsed" class="title">One Piece</h2>
  </div>
</template>
<script setup lang="ts" name="Logo">
interface Props {
  collapsed: boolean
}

withDefaults(defineProps<Props>(), {
  collapsed: false
})
</script>

<style lang="scss" scoped>
// .logo {
//   @apply flex overflow-hidden whitespace-nowrap items-center;

//   height: 64px;
//   padding-left: 24px;
//   line-height: 64px;

//   img {
//     height: 32px;
//     margin-right: 8px;
//   }

//   .title {
//     @apply mb-0 text-xl;
//     color: @primary-color;
//   }
// }
</style>
