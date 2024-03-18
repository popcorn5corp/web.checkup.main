<template>
  <div class="text-wrapper">
    <h1>{{ $t('page.workspace.inviteStep1Tit') }}</h1>
    <p>{{ $t('page.workspace.inviteStep1Desc') }}</p>
  </div>
  <div class="form-wrapper">
    <div class="input-wrapper">
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
        class="btn"
        :label="isConfirm ? '' : $t('component.button.confirm')"
        @click="onCheckInviteCode"
        :loading="isLoading"
      >
        <template #icon v-if="isConfirm">
          <CheckOutlined />
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts" name="InviteCodeForm">
import { WorkspaceService } from '@/services'
import { CheckOutlined } from '@ant-design/icons-vue'
import { Input } from 'ant-design-vue'
import { ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { useMessage } from '@/hooks/useMessage'

const { createMessage } = useMessage()

const { t } = useI18n()
const workspaceStore = useWorkspaceStore()
const { setJoinParam, setNextBtnDisabled } = workspaceStore
const { getFormValues } = toRefs(workspaceStore)
const isLoading = ref(false)
const isConfirm = ref(false)

const onCheckInviteCode = async () => {
  const codeValue = getFormValues.value.inviteCode.trim()
  const reg = /^[0-9]+$/

  try {
    if (codeValue.length) {
      isLoading.value = true
      if (reg.test(codeValue)) {
        // 유효 초대코드 확인
        const { data } = await WorkspaceService.checkInviteCode({ inviteCode: codeValue })
        const { workspaceId, workspaceName, workspaceInviteLogId } = data

        // 워크스페이스 이름&아이디 저장
        setJoinParam({ workspaceId, workspaceName, workspaceInviteLogId })
        setNextBtnDisabled(false)
        isConfirm.value = true
      } else {
        createMessage.error(t('message.validate.checkInviteCode'))
        setNextBtnDisabled(true)
      }
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
</script>

<style lang="scss">
.form-wrapper {
  .input-wrapper {
    position: relative;

    .btn {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      padding: 4.5px 8px;
    }
  }
}
</style>
