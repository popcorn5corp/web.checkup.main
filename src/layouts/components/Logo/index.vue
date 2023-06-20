<template>
  <div class="logo">
    <img v-if="!collapsed" src="@/assets/images/checkup_logo.jpg" alt="" />
    <img v-else src="@/assets/images/checkup_simple_logo.png" alt="" />
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
.logo {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  align-items: center;
  height: 64px;
  // padding-left: 24px;
  line-height: 64px;

  img {
    // height: 32px;
    // margin-right: 8px;
    width: 100%;
  }

  .title {
    color: blue;
    margin-bottom: 0;
  }
}
</style>
