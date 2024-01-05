<template>
  <div class="user-detail-container">
    <h3 class="title">{{ $t('common.detailInfo') }}</h3>
    <div class="content-wrapper">
      <Descriptions :column="6">
        <Descriptions.Item :label="$t('page.manage.joinDate')" :span="6">
          {{ state.data.detail?.joinDate }}
        </Descriptions.Item>
        <Descriptions.Item :label="$t('common.gender')" :span="6">
          {{ state.data.detail?.gender.label }}
        </Descriptions.Item>
      </Descriptions>
    </div>
    <h3 class="title">{{ $t('page.manage.group') }}</h3>
    <div class="content-wrapper">
      <div class="group-wrapper">
        <template v-if="state.data.groups?.length">
          <span v-for="group in state.data.groups" :key="group.groupId" class="group-item">
            {{ group.name }}
          </span>
        </template>
        <template v-else> - </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ManageUserService } from '@/services'
import { Descriptions } from 'ant-design-vue'
import { reactive, watch } from 'vue'
import type { IManageUser } from '@/services/manage-users/interface'
import { useWorkspaceStore } from '@/stores/modules/workspace'

interface UserDetailProps {
  workspaceUserId: string
}

const props = defineProps<UserDetailProps>()
const { getWorkspaceId } = useWorkspaceStore()

const state = reactive({
  data: {
    detail: {
      joinDate: '',
      gender: {
        label: '',
        value: ''
      }
    },
    groups: [] as IManageUser.GroupData[]
  }
})

const fetchUserDetail = async (workspaceUserId: string) => {
  getWorkspaceId &&
    (await ManageUserService.getOneById(getWorkspaceId, workspaceUserId).then(
      ({ success, data }) => {
        if (success) {
          state.data = {
            ...data
          }
        }
      }
    ))
}

watch(
  () => props.workspaceUserId,
  (id) => {
    fetchUserDetail(id)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.user-detail-container {
  padding: 1rem;
  padding-bottom: 20px;
  .title {
    font-weight: 700;
    padding: 10px 0;
  }
  .content-wrapper {
    padding: 0 10px;
  }

  .group-wrapper {
    display: flex;
    gap: 10px;
    flex-direction: row;
    flex-wrap: wrap;
    .group-item {
      padding: 5px 17px;
      background: $color-gray-4;
    }
  }
}
</style>
