<template>
  <div class="top-container">
    <ThemeToggle />
    <div class="language-setting-wrapper">
      <LanguageSetting />
    </div>
  </div>

  <div id="workspace-container">
    <RouterView v-if="!getStepType" />
    <StepView v-else :uid="workspaceUserInfo.uid" />
  </div>
</template>

<script setup lang="ts" name="Workspace">
import { reactive, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { type WorkspaceStepType, workspaceStepTypes } from '@/stores/modules/workspace/types'
import LanguageSetting from '@/components/header/src/components/LanguageSetting.vue'
import { ThemeToggle } from '@/components/theme-toggle'
import StepView from './components/StepView.vue'

const router = useRouter()
const workspaceStore = useWorkspaceStore()
const { getStepType } = toRefs(workspaceStore)
const { getUser } = useAuthStore()

const workspaceUserInfo = reactive({
  workspaceCount: getUser.workspaceCount,
  userName: getUser.userName,
  uid: getUser.uid
})

watch(
  () => router.currentRoute,
  (route) => {
    const stepType = (route.value.path.split('/')[2] || null) as WorkspaceStepType
    workspaceStore.setStepType(workspaceStepTypes.includes(stepType) ? stepType : null)
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style lang="scss">
.top-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 10px;

  .ant-descriptions .ant-descriptions-header {
    display: none;
  }

  :deep(.ant-descriptions-item) {
    padding: 0;
  }

  .language-setting-wrapper {
    width: 200px;
  }
}

#workspace-container {
  width: 100vw;
  height: 100vh;

  background-color: $color-white;
  color: inherit;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .content {
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
