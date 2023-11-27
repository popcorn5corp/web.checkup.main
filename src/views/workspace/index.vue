<template>
  <div id="workspace-container" class="workspace-container" v-if="!isLoading">
    <div class="left" v-if="getType !== 'list'">
      <template v-if="getType === 'welcome'">
        <div class="welcome-text-wrapper">
          <h1>
            {{ $t('page.workspace.welcomeTit', { userName: workspaceUserInfo.userName }) }}
          </h1>
          <p>
            {{ $t('page.workspace.welcomeDesc') }}
          </p>
        </div>
        <img :src="welcomeImg" alt="작가 upklyak / 출처 Freepik" />
      </template>
      <template v-else>
        <img
          :src="getType === 'create' ? createImg : inviteImg"
          alt="작가 upklyak / 출처 Freepik"
        />
      </template>
    </div>
    <div class="right">
      <StepAndBtnsView :uid="workspaceUserInfo.uid" />
    </div>
  </div>
</template>

<script setup lang="ts" name="Workspace">
import welcomeImg from '@/assets/images/workspace2.png'
import createImg from '@/assets/images/workspace_create.png'
import inviteImg from '@/assets/images/workspace_invite.png'
import { AuthService } from '@/services'
import { message } from 'ant-design-vue'
import { reactive, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import StepAndBtnsView from './components/StepAndBtnsView.vue'

const { t } = useI18n()
const router = useRouter()
const workspaceStore = useWorkspaceStore()
const { getType } = toRefs(workspaceStore)
const { getUser } = useAuthStore()

const workspaceUserInfo = reactive({
  workspaceCount: 0,
  userName: '',
  uid: ''
})
const isLoading = ref(false)

;(async () => {
  isLoading.value = true
  try {
    const { workspaceCount, userName, uid } = getUser
    workspaceUserInfo.workspaceCount = workspaceCount
    workspaceUserInfo.userName = userName
    workspaceUserInfo.uid = uid

    if (getType.value === 'create') {
      router.push({
        name: 'workspace-create'
      })
    } else {
      if (workspaceUserInfo.workspaceCount > 1) {
        router.push({
          name: 'workspace-list'
        })
        workspaceStore.setType('list')
      }
    }
  } catch (err) {
    message.error(t('common.message.reTry'))
  }

  isLoading.value = false
})()
</script>

<style lang="scss">
#workspace-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  color: inherit;
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
    h1 {
      margin-bottom: 10px;
    }
    p {
      color: #888;
      margin-bottom: 5px;
      font-size: 18px;
      white-space: pre-line;
      line-height: 1.5;
    }
  }
  img {
    width: 100%;
  }
}

@include xxs {
  .left {
    display: none;
  }
  .right {
    width: 90% !important;
  }
}
@include xs {
  .left {
    display: none;
  }
  .right {
    width: 90% !important;
  }
}
@include sm {
  .left {
    display: none;
  }
  .right {
    width: 80% !important;
  }
}
@include md {
  .right {
    width: 80% !important;
  }
}
</style>
