<template>
  <div class="content left">
    <img
      :src="getStepType === 'create' ? createImg : inviteImg"
      alt="작가 upklyak / 출처 Freepik"
    />
  </div>
  <div class="content right">
    <div id="workspace-step-btn-container">
      <div class="step-wrapper">
        <span>{{ getCurrentStep }}</span>
        <span> / </span>
        <span>{{ getSteps.length }}</span>
      </div>

      <div class="routerView">
        <div class="transition-group">
          <RouterView></RouterView>
          <!-- <Transition name="steps" appear mode="out-in">
            <div class="active" :key="getCurrentStep">
              <component :is="getSteps[getCurrentStep - 1].component" />
            </div>
          </Transition> -->
        </div>
      </div>

      <div class="btns-wrapper">
        <Button
          class="btn"
          size="large"
          :label="$t('component.button.prev')"
          @click="workspaceStore.prevCurrentStep()"
        />
        <Button
          v-if="getSteps[getCurrentStep - 1].isJump"
          class="btn"
          size="large"
          :label="$t('component.button.jump')"
          @click="workspaceStore.nextCurrentStep()"
        />
        <Button
          v-if="getSteps[getCurrentStep - 1].nextBtnText"
          class="btn"
          type="primary"
          size="large"
          :label="getSteps[getCurrentStep - 1].nextBtnText || ''"
          :disabled="getNextBtnDisabled"
          @click="onComplete"
          :loading="isLoading"
        />
        <Button
          v-if="getCurrentStep === getSteps.length"
          class="btn"
          type="primary"
          size="large"
          :label="$t('component.button.toMain')"
          @click="router.push({ name: 'root' })"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="StepView">
import createImg from '@/assets/images/workspace_create.png'
import inviteImg from '@/assets/images/workspace_invite.png'
import { WorkspaceService } from '@/services'
import { message } from 'ant-design-vue'
import { ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useWorkspaceStore } from '@/stores/modules/workspace'

const { t } = useI18n()
const router = useRouter()
const workspaceStore = useWorkspaceStore()
const {
  getCurrentStep,
  getSteps,
  getStepType,
  getNextBtnDisabled,
  getFormValues,
  getWorkspaceId,
  getWorkspaceInviteLogId
} = toRefs(workspaceStore)
const isLoading = ref(false)

const props = defineProps({
  uid: {
    type: String,
    default: ''
  }
})

const onComplete = async () => {
  try {
    if (getSteps.value[getCurrentStep.value - 1].isComplete) {
      isLoading.value = true
      if (getStepType.value === 'create') {
        // 생성 api
        // eslint-disable-next-line
        const { inviteCode, url, ...formDataWithoutInviteCode } = getFormValues.value
        const { data, success } = await WorkspaceService.createWorkspace({
          ...formDataWithoutInviteCode,
          uid: props.uid
        })

        if (success) {
          const { workspaceId, workspaceName } = data
          workspaceStore.setWorkspaceIdAndName(workspaceId, workspaceName)
          workspaceStore.setSelectedWorkspace({ workspaceId, workspaceName })
        }
      } else {
        // 초대 api
        const { nickname, originName, saveName, path, size, ext } = getFormValues.value
        await WorkspaceService.joinWorkspace({
          uid: props.uid,
          workspaceId: getWorkspaceId.value,
          workspaceInviteLogId: getWorkspaceInviteLogId.value,
          nickname,
          originName,
          saveName,
          path,
          size,
          ext
        })
      }
    }

    workspaceStore.nextCurrentStep()
  } catch (err) {
    message.error(t('common.message.reTry'))
    console.log(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss">
#workspace-step-btn-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  .step-wrapper {
    background: #1890ff;
    margin-bottom: 1.5rem;
    padding: 5px 12px;
    border-radius: 1rem;
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    align-self: flex-start;
  }

  .btns-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .routerView {
    width: 100%;
    min-height: 400px;
  }

  .text-wrapper {
    width: 100%;
    text-align: center;
    h1 {
      height: 30px;
      margin-bottom: 10px;
    }
    p {
      font-weight: 500;
      font-size: 19px;
      color: #888;
      margin-bottom: 5px;
      line-height: 1.7;
      white-space: pre-line;
    }
  }

  .form-wrapper {
    width: 100%;
    margin: 2rem 0 1rem;
    input {
      padding: 0.8rem 2rem;
      font-size: 1rem;
      background-color: #f5f5f6;
      border-radius: 0.5rem;
      border: none;
      color: #222;
    }
    input::placeholder {
      color: #777;
    }
    small {
      font-weight: 400;
      font-size: 15px;
      color: #888;
      margin-left: 3px;
    }
  }

  .transition-group {
    position: relative;
    opacity: 1;
  }
  .active {
    width: 100%;
    position: absolute;
    transition: all 0.5s;
  }
  .steps-enter-from {
    opacity: 0;
    translate: 100px 0;
  }
  .steps-enter-to {
    opacity: 1;
    translate: 0 0;
  }
  .steps-leave-from {
    opacity: 0;
  }
}

@include xxs {
  .routerView {
    min-height: 440px !important;
  }
}
@include xs {
  .routerView {
    min-height: 420px !important;
  }
}
@include sm {
  .routerView {
    min-height: 420px !important;
  }
}
@include md {
  .routerView {
    min-height: 420px !important;
  }
}
</style>
