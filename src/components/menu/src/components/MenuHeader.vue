<template>
  <div class="menu-header">
    <div class="user-preview">
      <div class="img-wrapper">
        <!-- <img src="@/assets/images/avatar2.png" /> -->
        <Avatar style="background-color: #c6c6c6">
          <template #icon>
            <UserOutlined />
          </template>
        </Avatar>
      </div>
      <div class="info" v-if="!collapsed">
        <div class="name">{{ getUser.userName }}</div>
        <div class="email">{{ getUser.userId }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="MenuHeader">
import { useAuthStore } from '@/stores'
import { Avatar } from 'ant-design-vue'
import { computed } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { UserOutlined } from '@/components/icons'

interface Props {
  collapsed: boolean
}

const props = defineProps<Props>()
const { getUser } = useAuthStore()
const { getTheme } = useProjectConfigStore()

const styles = computed(() => {
  const { collapsed } = props
  const { navTheme } = getTheme

  return {
    imgWidth: collapsed ? '2rem' : '6rem',
    imgHeight: collapsed ? '2rem' : '6rem',
    nameColor: navTheme === 'dark' ? '#ffffff' : '#121212'
  }
})
</script>
<style lang="scss" scoped>
.menu-header {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // height: 50px;

  .user-preview {
    padding: 1rem;
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
        color: v-bind('styles.nameColor');
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
