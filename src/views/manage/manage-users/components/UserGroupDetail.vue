<template>
  <div class="user-group-container">
    <template v-if="state.data.groups?.length">
      <span v-for="group in state.data.groups" :key="group.groupId" class="group-item">
        {{ group.name }}
      </span>
    </template>
    <template v-else> - </template>
  </div>
</template>

<script setup lang="ts">
import { ManageUserService } from '@/services'
import { reactive, watch } from 'vue'

import type { IManageUser } from '@/services/manage-users/types'

import { useWorkspaceStore } from '@/stores/modules/workspace'

interface UserGroupDetailProps {
  workspaceUserId: string
}

const props = defineProps<UserGroupDetailProps>()
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
.user-group-container {
  max-height: 163px;
  display: flex;
  gap: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: scroll;
  .group-item {
    padding: 5px 17px;
    background: $color-gray-4;
  }
}
</style>
