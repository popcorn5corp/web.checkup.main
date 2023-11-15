<template>
  <div class="text-wrapper">
    <h2>팀 또는 회사명 입력</h2>
    <p>checkup 워크스페이스의 이름이 됩니다.</p>
  </div>
  <div class="form-wrapper">
    <Input
      placeholder="팀 또는 회사명 입력해주세요."
      v-model:value="formValues.workspaceName"
      :maxlength="30"
    />
  </div>
</template>

<script lang="ts" setup>
import { Input } from 'ant-design-vue'
import { computed } from 'vue'
import { useWorkspceStore } from '@/stores/modules/workspace'

const workspaceStore = useWorkspceStore()
const formValues = computed(() => workspaceStore.formValues)
</script>

<style lang="scss" scoped></style>
