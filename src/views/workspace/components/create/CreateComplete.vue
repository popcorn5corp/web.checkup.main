<template>
  <div class="text-wrapper">
    <h1>{{ $t('page.workspace.createCompleteTit') }}</h1>
    <p>{{ $t('page.workspace.createCompleteDesc', { userName: getFormValues.nickname }) }}</p>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { useWorkspaceStore } from '@/stores/modules/workspace'

const workspaceStore = useWorkspaceStore()
const { getFormValues } = toRefs(workspaceStore)
</script>

<style lang="scss" scoped></style>
