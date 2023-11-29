<template>
  <div class="transition-group">
    <Transition name="create" appear mode="out-in">
      <div class="active" :key="getCurrentStep">
        <component :is="getSteps[getCurrentStep - 1].component" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts" name="WorkspaceCreate">
import { toRefs } from 'vue'
import { useWorkspaceStore } from '@/stores/modules/workspace'

const workspaceStore = useWorkspaceStore()
const { getCurrentStep, getSteps } = toRefs(workspaceStore)

// ;(async () => {
//   workspaceStore.setStepType('create')
// })()
</script>

<style lang="scss" scoped>
// transition
.transition-group {
  position: relative;
  opacity: 1;
}
.active {
  width: 100%;
  position: absolute;
  transition: all 0.5s;
}
.create-enter-from {
  opacity: 0;
  translate: 100px 0;
}
.create-enter-to {
  opacity: 1;
  translate: 0 0;
}
.create-leave-from {
  opacity: 0;
}
</style>
