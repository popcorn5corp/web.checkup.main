<template>
  <div class="text-wrapper">
    <h2>워크 스페이스 초대 코드 입력</h2>
    <p>수령하신 초대 코드를 아래에 입력해주세요.</p>
    <p>초대 코드를 받지 못하셨을 경우,</p>
    <p>담당자 또는 시스템 관리자 분께 문의하시기 바랍니다.</p>
  </div>
  <div class="form-wrapper">
    <Input placeholder="팀 또는 회사명을 입력해주세요." v-model:value="formValues.inviteCode" />
  </div>
</template>

<script lang="ts" setup>
import { Input } from 'ant-design-vue'
import { computed } from 'vue'
import { useWorkspceStore } from '@/stores/modules/workspace'

const workspaceStore = useWorkspceStore()
const formValues = computed(() => workspaceStore.formValues)
</script>

<style lang="scss"></style>
