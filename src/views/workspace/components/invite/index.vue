<template>
  <div class="transition-group">
    <Transition name="invite" appear>
      <div class="active" :key="getCurrentStep">
        <component :is="getSteps[getCurrentStep - 1].component" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts" name="WorkspaceInvite">
import { toRefs } from 'vue'
import { useWorkspaceStore } from '@/stores/modules/workspace'

const workspaceStore = useWorkspaceStore()
const { getCurrentStep, getSteps } = toRefs(workspaceStore)
</script>

<style lang="scss">
// transition
.transition-group {
  position: relative;
  .active {
    width: 100%;
    position: absolute;
    transition: all 0.5s;
  }
}
.invite-enter-from {
  opacity: 0;
  translate: 100px 0;
}
.invite-enter-to {
  opacity: 1;
  translate: 0 0;
}
.invite-leave-from {
  opacity: 0;
}
</style>
