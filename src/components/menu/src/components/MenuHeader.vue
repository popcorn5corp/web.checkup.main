<template>
  <div class="menu-header">
    <div class="user-preview">
      <div class="img-wrapper">
        <img :src="getWorkspace?.user.profile" @click="tempFlag++" />
      </div>
      <div class="info" v-if="!collapsed">
        <div class="name">{{ getWorkspace?.user.nickname }}</div>
        <div class="email">{{ getWorkspace?.user.email }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="MenuHeader">
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { sampleMenus } from '../mock'

interface Props {
  collapsed: boolean
}

const props = defineProps<Props>()
const { getWorkspace, menus } = storeToRefs(useWorkspaceStore())

//temp code
const tempFlag = ref(0)
watch(
  () => tempFlag.value,
  (tempFlag) => {
    if (tempFlag === 3) {
      menus.value = menus.value.concat(...(sampleMenus as any))
    }
  }
)

const styles = computed(() => {
  const { collapsed } = props

  return {
    imgWidth: collapsed ? '2rem' : '5rem',
    imgHeight: collapsed ? '2rem' : '5rem'
  }
})
</script>
<style lang="scss" scoped>
.menu-header {
  .user-preview {
    padding: 10px;
    align-items: center;
    flex-direction: column;
    width: 100%;
    display: flex;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    .img-wrapper {
      width: v-bind('styles.imgWidth');
      height: v-bind('styles.imgHeight');
      position: relative;

      > img {
        border-radius: 9999px;
        width: 100%;
        height: 100%;
        vertical-align: top;
        max-width: 100%;
      }

      :deep(.ant-avatar) {
        width: 100%;
        height: 100%;

        > span {
          width: 100%;
          height: 100%;

          > svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .info {
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      display: flex;
      margin-top: 1.5rem;

      .name {
        white-space-collapse: collapse;
        text-wrap: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: 500;
        line-height: 1.5;
        text-align: center;
        width: 100%;
      }

      .email {
        line-height: 1.5;
        font-weight: 500;
        font-size: 0.8125rem;
        text-align: center;
        overflow: hidden;
        white-space-collapse: collapse;
        text-wrap: nowrap;
        text-overflow: ellipsis;
        margin-top: 0.125rem;
        width: 100%;
        color: $color-gray-7;
      }
    }
  }
}
</style>
