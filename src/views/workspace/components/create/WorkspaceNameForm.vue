<template>
  <div class="text-wrapper">
    <h1>{{ $t('page.workspace.createStep1Tit') }}</h1>
    <p>{{ $t('page.workspace.createStep1Desc') }}</p>
  </div>
  <div class="form-wrapper">
    <Input
      :placeholder="$t('page.workspace.ph.inputTeamOrCompanyName')"
      v-model:value="getFormValues.workspaceName"
      :maxlength="30"
      @input="onInput"
    />
  </div>
</template>

<script lang="ts" setup>
import { Input } from 'ant-design-vue'
import { toRefs, watch } from 'vue'
import { useWorkspaceStore } from '@/stores/modules/workspace'

const workspaceStore = useWorkspaceStore()
const { getFormValues } = toRefs(workspaceStore)

const onInput = (e: Event) => {
  if ((e.target as HTMLInputElement).value.length > 0) {
    workspaceStore.setNextBtnDisabled(false)
  } else {
    workspaceStore.setNextBtnDisabled(true)
  }
}

watch(
  getFormValues,
  (formValue) => {
    if (formValue.workspaceName.length) {
      workspaceStore.setNextBtnDisabled(false)
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped></style>
