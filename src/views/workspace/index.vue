<template>
  <h1>
    {{ 'type: ' + type }}
  </h1>
  <div id="workspace-container" v-if="!isLoading">
    <template v-if="type === 'welcome'">
      <Welcome />
    </template>
    <template v-else>
      <div class="left">
        <img :src="type === 'create' ? createImg : inviteImg" alt="작가 upklyak / 출처 Freepik" />
      </div>
      <div class="right">
        <div id="container">
          <div class="step-wrapper">
            <span>{{ step }}</span>
            <span> / </span>
            <span>5</span>
            <!-- {{ workspaceSteps[type].length }} -->
          </div>

          <!-- workspace id 2개 이상일 때 -->
          <template v-if="workspaceUserInfo.workspaceCount >= 2">
            <WorkspaceList />
          </template>

          <!-- workspace id 0개일 때 -->
          <template v-if="workspaceUserInfo.workspaceCount === 0">
            <div class="routerView">
              <RouterView></RouterView>
            </div>
          </template>

          <div class="btns-wrapper">
            <Button class="btn" size="large" label="이전" @click="workspaceStore.prevStep()" />
            <Button
              v-if="step === 3 && type === 'create'"
              class="btn"
              size="large"
              label="건너뛰기"
              @click="workspaceStore.nextStep()"
            />
            <Button
              v-if="type === 'create' ? step !== 5 : step !== 3"
              class="btn"
              type="primary"
              size="large"
              :label="nextBtnText"
              :disabled="nextBtnDisabled"
              @click="onComplete"
            />
            <!-- v-if="(step === 5 && type === 'create') || (step === 3 && type === 'invite')" -->
            <Button
              class="btn"
              type="primary"
              size="large"
              label="메인으로"
              @click="router.push({ name: 'Root' })"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup name="Workspace">
import createImg from '@/assets/images/workspace_create.png'
import inviteImg from '@/assets/images/workspace_invite.png'
import { WorkspaceService } from '@/services'
import { message } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { reactive } from 'vue'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { useWorkspceStore } from '@/stores/modules/workspace'
import { type WorkspaceStepType } from '@/stores/modules/workspace'
import { workspaceSteps } from '@/stores/modules/workspace'
import { Button } from '@/components/button'
import Welcome from './components/Welcome.vue'
import WorkspaceList from './components/WorkspaceList.vue'

const router = useRouter()
const workspaceStore = useWorkspceStore()

const {
  config: { theme }
} = useProjectConfigStore()

// TODO 구조분해 수정
const step = computed(() => workspaceStore.step)
const type = computed(() => workspaceStore.type)
const nextBtnDisabled = computed(() => workspaceStore.nextBtnDisabled)
const formValues = computed(() => workspaceStore.formValues)
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
const nextBtnText = computed(() => {
  if (type.value === 'create' && step.value === 4) {
    return '완료하기'
  }
  if (type.value === 'invite' && step.value === 2) {
    return '참여하기'
  }
  return '다음'
})
const isLoading = ref(false)
const workspaceUserInfo = reactive({
  workspaceCount: 0,
  userName: ''
})

;(async () => {
  // workspaceStore.resetStep()
  // workspaceStore.resetType()
  isLoading.value = true
  try {
    const { data } = await WorkspaceService.getUser()
    workspaceUserInfo.workspaceCount = data.workspaceCount
    workspaceUserInfo.userName = data.userName
  } catch (err) {
    message.error('잠시 후 다시 시도해주세요.')
  }

  // TODO before router
  // const currentRoute = router.currentRoute.value
  // if (step.value === 0 && currentRoute.fullPath.includes('/workspace/')) {
  //   workspaceStore.setType(currentRoute.name as WorkspaceStepType)
  //   workspaceStore.nextStep()
  // }
  isLoading.value = false
})()

const onComplete = async () => {
  try {
    if (type.value === 'create' && step.value === 4) {
      // 생성 api
      const { data } = await WorkspaceService.createWorkspace(formValues.value)
      console.log('data', data)
    }
    if (type.value === 'invite' && step.value === 2) {
      // 초대 api
    }
    workspaceStore.nextStep()
  } catch (err) {
    message.error('잠시 후 다시 시도해주세요.')
  }
}

// watch(step, (step) => {
//   if (type.value.length) {
//     console.log('z3', step, workspaceSteps[type.value][step - 1])
//   }
// })
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
  .welcome-text-wrapper {
    padding-left: 70px;
    margin-bottom: 1rem;
    text-align: left;
    p {
      color: #888;
      margin-bottom: 5px;
      font-size: 16px;
    }
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
    min-height: 380px;
  }

  .text-wrapper {
    width: 100%;
    text-align: center;
    h2 {
      height: 30px;
    }
    p {
      font-weight: 500;
      font-size: 16px;
      color: #888;
      margin-bottom: 5px;
      line-height: 1.7;
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
    min-height: 420px !important;
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
    min-height: 400px !important;
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
    min-height: 400px !important;
  }
}
@include md {
  .routerView {
    min-height: 400px !important;
  }
}
</style>
