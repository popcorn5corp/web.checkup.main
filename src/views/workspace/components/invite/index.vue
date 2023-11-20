<template>
  <div class="transition-group">
    <Transition name="invite" appear>
      <div class="active" :key="currentStep">
        <component :is="steps[currentStep - 1].component" />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useWorkspceStore } from '@/stores/modules/workspace'

const workspaceStore = useWorkspceStore()
const currentStep = computed(() => workspaceStore.currentStep)
const steps = computed(() => workspaceStore.steps)
</script>

<style lang="scss">
// transition
.transition-group {
  position: relative;
}
.active {
  width: 100%;
  position: absolute;
  transition: all 0.5s;
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
