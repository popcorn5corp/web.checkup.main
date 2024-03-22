<template>
  <div class="text-wrapper">
    <h1>{{ $t('page.workspace.inviteStep1Tit') }}</h1>
    <p>{{ $t('page.workspace.inviteStep1Desc') }}</p>
  </div>

  <div class="form-wrapper">
    <div class="input-wrapper">
      <FormItem :isError="isError">
        <Input
          :placeholder="$t('component.ph.inputInviteCode')"
          v-model:value="getFormValues.inviteCode"
          @input="
            () => {
              setNextBtnDisabled(true)
              isConfirm = false
            }
          "
        />
        <Button
          v-if="!isConfirm"
          class="check-btn"
          :label="$t('component.button.ok')"
          @click="onCheckInviteCode"
          :loading="isLoading"
        />
        <CheckOutlined v-else class="check-icon" />

        <template #validText>{{ validText }}</template>
      </FormItem>
    </div>
  </div>
</template>

<script setup lang="ts" name="InviteCodeForm">
import { WorkspaceService } from '@/services'
import { CheckOutlined } from '@ant-design/icons-vue'
import { Input } from '@/components/input'
import { ref, toRefs } from 'vue'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { useMessage } from '@/hooks/useMessage'
import { FormItem } from '@/components/form'

const { createMessage } = useMessage()
const workspaceStore = useWorkspaceStore()
const { setJoinParam, setNextBtnDisabled } = workspaceStore
const { getFormValues } = toRefs(workspaceStore)
const isLoading = ref(false)
const isConfirm = ref(false)
const isError = ref(false)
const validText = ref('')

async function onCheckInviteCode() {
  const codeValue = getFormValues.value.inviteCode.trim()

  try {
    if (codeValue.length) {
      isLoading.value = true
      // 유효 초대코드 확인
      const { data } = await WorkspaceService.checkInviteCode({ inviteCode: codeValue })
      const { workspaceId, workspaceName, workspaceInviteLogId } = data

      // 워크스페이스 이름&아이디 저장
      setJoinParam({ workspaceId, workspaceName, workspaceInviteLogId })
      setNextBtnDisabled(false)
      isConfirm.value = true
    }
  } catch (err: any) {
    console.log(err)
    isLoading.value = false
    createMessage.error(err.response.data.error.message)
    setNextBtnDisabled(true)
  } finally {
    isLoading.value = false
  }
}

// function isAutoCodeValid(value: string): boolean {
//   const rule = /^[0-9]+$/
//   let result = true;

//   if (!rule.test(value)) {
//     isError.value = true;
//     validText.value = t('message.validate.checkInviteCode');
//     return false;
//   }

//   isError.value = false;
//   return true;
// }
</script>

<style lang="scss">
.form-wrapper {
  .input-wrapper {
    position: relative;

    .check-btn,
    .check-icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      padding: 4.5px 8px;
      z-index: 10;
    }

    .check-icon {
      > svg {
        color: $color-green-8;
        font-size: 20px;
        font-weight: 500;
      }
    }
  }
}
</style>
