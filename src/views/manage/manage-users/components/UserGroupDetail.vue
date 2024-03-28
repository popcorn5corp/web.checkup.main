<template>
  <div class="user-group-container">
    <template v-if="state.groups?.length">
      <span v-for="group in state.groups" :key="group.groupId" class="group-item">
        {{ group.name }}
      </span>
    </template>
    <template v-else> - </template>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

import type { IManageUser } from '@/services/manage-users/types'

interface UserGroupDetailProps {
  userGroupData: [] | IManageUser.GroupData[]
}

const props = defineProps<UserGroupDetailProps>()

const state = reactive({
  groups: [] as IManageUser.GroupData[]
})

watch(
  () => props.userGroupData,
  (groupData) => {
    state.groups = groupData
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
