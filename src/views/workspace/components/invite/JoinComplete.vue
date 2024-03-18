<template>
  <div class="text-wrapper">
    <h1>
      {{ $t('page.workspace.joinCompleteTit', { workspaceName: state.workspaceName }) }}
    </h1>
    <p>{{ $t('page.workspace.joinCompleteDesc1') }}</p>
  </div>

  <div class="user-wrapper" v-if="!isLoading">
    <a-avatar-group
      :max-count="5"
      size="large"
      :max-style="{ color: '#fff', backgroundColor: '#39b2fd', cursor: 'pointer' }"
    >
      <a-avatar
        v-for="user in state.workspaceUsers"
        :key="user.uid"
        :src="user.userImagePath"
      ></a-avatar>
    </a-avatar-group>
    <span class="avatar-text">
      {{ $t('page.workspace.joinCompleteDesc2') }}
    </span>
  </div>
</template>

<script setup lang="ts" name="JoinComplete">
import { WorkspaceService } from '@/services'
import { reactive, ref, toRefs, unref } from 'vue'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import type { WorkspaceUsers } from '@/stores/modules/workspace/types'

interface State {
  workspaceName: string
  totalUserCount: number
  workspaceUsers: WorkspaceUsers[]
}

const workspaceStore = useWorkspaceStore()
const { getJoinParam } = toRefs(workspaceStore)

const state = reactive<State>({
  workspaceName: '',
  totalUserCount: 0,
  workspaceUsers: []
})
const isLoading = ref(false)

;(async () => {
  try {
    isLoading.value = true
    const { data } = await WorkspaceService.getWorkspaceInformation(unref(getJoinParam).workspaceId)
    state.workspaceName = data.workspaceName
    state.totalUserCount = data.totalUserCount
    state.workspaceUsers = data.workspaceUsers

    workspaceStore.setSelectedWorkspaceId(data.workspaceId)
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
})()
</script>

<style lang="scss">
.user-wrapper {
  text-align: center;
  margin: 1rem 0;

  .avatar-text {
    font-size: 15px;
  }
}
</style>
