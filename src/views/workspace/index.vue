<template>
  <div id="workspace-container" v-if="!isLoading">
    <template v-if="getType === ''">
      <template v-if="workspaceUserInfo.workspaceCount > 1">
        <WorkspaceList />
      </template>
      <template v-else>
        <Welcome :userName="workspaceUserInfo.userName" />
      </template>
    </template>
    <template v-else>
      <div class="left">
        <img
          :src="getType === 'create' ? createImg : inviteImg"
          alt="작가 upklyak / 출처 Freepik"
        />
      </div>
      <div class="right">
        <div id="container">
          <div class="step-wrapper">
            <span>{{ getCurrentStep }}</span>
            <span> / </span>
            <span>{{ getSteps.length }}</span>
          </div>

          <div class="routerView">
            <RouterView></RouterView>
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
            />
            <Button
              v-if="getCurrentStep === getSteps.length"
              class="btn"
              type="primary"
              size="large"
              :label="$t('component.button.toMain')"
              @click="router.push({ name: 'Root' })"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts" name="Workspace">
import createImg from '@/assets/images/workspace_create.png'
import inviteImg from '@/assets/images/workspace_invite.png'
import { AuthService, WorkspaceService } from '@/services'
import { message } from 'ant-design-vue'
import { computed, reactive, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { Button } from '@/components/button'
import Welcome from './components/Welcome.vue'
import WorkspaceList from './components/WorkspaceList.vue'

const { t } = useI18n()
const router = useRouter()
const workspaceStore = useWorkspaceStore()
const {
  getCurrentStep,
  getSteps,
  getType,
  getNextBtnDisabled,
  getFormValues,
  getWorkspaceId,
  getWorkspaceInviteLogId
} = toRefs(workspaceStore)
const {
  config: { theme }
} = useProjectConfigStore()

const themeStyle = computed(() => {
  return {
    backgroundColor: theme.navTheme === 'realDark' ? 'rgba(0, 21, 41, 0.8509803922)' : '#fff',
    color: theme.navTheme === 'realDark' ? '#fff' : '',
    input: {
      backgroundColor: theme.navTheme === 'realDark' ? '#fff' : '#f5f5f6',
      color: theme.navTheme === 'realDark' ? '#000000' : '#777'
    }
  }
})
const workspaceUserInfo = reactive({
  workspaceCount: 0,
  userName: '',
  uid: ''
})
const isLoading = ref(false)

;(async () => {
  isLoading.value = true
  try {
    const { data } = await AuthService.getUser()
    workspaceUserInfo.workspaceCount = data.workspaceCount
    workspaceUserInfo.userName = data.userName
    workspaceUserInfo.uid = data.uid
  } catch (err) {
    message.error(t('common.message.reTry'))
  }

  isLoading.value = false
})()

const onComplete = async () => {
  try {
    if (getSteps.value[getCurrentStep.value - 1].isComplete) {
      if (getType.value === 'create') {
        // 생성 api
        const { inviteCode, ...formDataWithoutInviteCode } = getFormValues.value
        const { data } = await WorkspaceService.createWorkspace({
          ...formDataWithoutInviteCode,
          uid: workspaceUserInfo.uid
        })
        workspaceStore.setWorkspaceIdAndName(data.workspaceId, data.workspaceName)
      } else {
        // 초대 api
        const { nickname, originName, saveName, path, size, ext } = getFormValues.value
        await WorkspaceService.joinWorkspace({
          uid: workspaceUserInfo.uid,
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
  }
}
</script>

<style lang="scss">
#workspace-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: v-bind('themeStyle.backgroundColor');
  color: v-bind('themeStyle.color');
  .left,
  .right {
    width: 50%;
    max-width: 700px;
    margin: 0 auto;
    padding: 1rem 2rem;
    overflow: hidden;
  }
  img {
    width: 100%;
  }
}
#container {
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
      background-color: v-bind('themeStyle.input.backgroundColor');
      border-radius: 0.5rem;
      border: none;
      color: #222;
    }
    input::placeholder {
      color: v-bind('themeStyle.input.color');
    }
    small {
      font-weight: 400;
      font-size: 15px;
      color: #888;
      margin-left: 3px;
    }
  }
}

@include xxs {
  .left {
    display: none;
  }
  .right {
    width: 90% !important;
  }
  .routerView {
    min-height: 440px !important;
  }
}
@include xs {
  .left {
    display: none;
  }
  .right {
    width: 90% !important;
  }
  .routerView {
    min-height: 420px !important;
  }
}
@include sm {
  .left {
    display: none;
  }
  .right {
    width: 80% !important;
  }
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
