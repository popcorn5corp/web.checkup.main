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
import { reactive, ref, toRefs } from 'vue'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import type { WorkspaceUsers } from '@/stores/modules/workspace'

const workspaceStore = useWorkspaceStore()
const { getWorkspaceId } = toRefs(workspaceStore)

interface TState {
  workspaceName: string
  totalUserCount: number
  workspaceUsers: WorkspaceUsers[]
}
const state = reactive<TState>({
  workspaceName: '',
  totalUserCount: 0,
  workspaceUsers: []
})
const isLoading = ref(false)

;(async () => {
  try {
    isLoading.value = true
    const { data } = await WorkspaceService.getWorkspaceInformation(getWorkspaceId.value)
    state.workspaceName = data.workspaceName
    state.totalUserCount = data.totalUserCount
    state.workspaceUsers = data.workspaceUsers
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
