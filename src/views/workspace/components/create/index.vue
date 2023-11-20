<template>
  <div class="transition-group">
    <Transition name="create" appear mode="out-in">
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
  opacity: 1;
}
// v-enter: 요소가 나타나기 시작할 때 적용
// v-enter-active: 요소가 나타나는 트랜지션이 진행되는 동안 적용
// v-enter-to: 요소가 나타나는 트랜지션이 완료될 때 적용
// v-leave: 요소가 사라지기 시작할 때 적용
// v-leave-active: 요소가 사라지는 트랜지션이 진행되는 동안 적용
// v-leave-to: 요소가 사라지는 트랜지션이 완료될 때 적용

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
