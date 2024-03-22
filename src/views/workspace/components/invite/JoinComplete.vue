<template>
  <div class="text-wrapper">
    <h1>
      {{ $t('page.workspace.joinCompleteTit', { workspaceName: state.workspaceName }) }}
    </h1>
    <p>{{ $t('page.workspace.joinCompleteDesc1') }}</p>
  </div>

  <div class="user-wrapper" v-if="!isLoading && workspaceOwner">
    <a-avatar :key="workspaceOwner.uid" :src="workspaceOwner.userImagePath" :size="50" />
    <span class="avatar-text">
      {{
        state.workspaceUsers.length > 1
          ? $t('page.workspace.joinCompleteDesc3', {
              name: workspaceOwner.nickname,
              count: state.workspaceUsers.length - 1
            })
          : $t('page.workspace.joinCompleteDesc2', { name: workspaceOwner.nickname })
      }}
    </span>
    <!-- <a-avatar-group
      :max-count="5"
      size="large"
      :max-style="{ color: '#fff', backgroundColor: '#39b2fd', cursor: 'pointer' }"
    >
      <a-avatar
        v-for="user in state.workspaceUsers"
        :key="user.uid"
        :src="user.userImagePath"
      ></a-avatar>
    </a-avatar-group> -->
  </div>
</template>

<script setup lang="ts" name="JoinComplete">
import { WorkspaceService } from '@/services'
import { reactive, ref, toRefs, unref } from 'vue'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import type { WorkspaceUser } from '@/stores/modules/workspace/types'

interface State {
  workspaceName: string
  totalUserCount: number
  workspaceUsers: WorkspaceUser[]
}

const workspaceStore = useWorkspaceStore()
const { getJoinParam } = toRefs(workspaceStore)

const state = reactive<State>({
  workspaceName: '',
  totalUserCount: 0,
  workspaceUsers: []
})
const isLoading = ref(false)
const workspaceOwner = ref<null | WorkspaceUser>(null)

;(async () => {
  try {
    isLoading.value = true
    const { data } = await WorkspaceService.getWorkspaceInformation(unref(getJoinParam).workspaceId)
    state.workspaceName = data.workspaceName
    state.totalUserCount = data.totalUserCount
    state.workspaceUsers = data.workspaceUsers
    workspaceOwner.value = data.workspaceUsers[0]

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

  .ant-avatar {
    margin-bottom: 30px;
  }

  .avatar-text {
    font-size: $font-size-small;
  }
}
</style>
