<template>
  <div class="transition-group">
    <TransitionGroup name="invite" appear>
      <div v-if="step === 1" class="active" key="inviteCodeForm">
        <InviteCodeForm />
      </div>
      <div v-if="step === 2" class="active" key="nameProfileForm">
        <NameProfileForm />
      </div>
      <div v-if="step === 3" class="active" key="joinComplete">
        <JoinComplete />
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useWorkspceStore } from '@/stores/modules/workspace'
import NameProfileForm from '../NameProfileForm.vue'
import InviteCodeForm from './InviteCodeForm.vue'
import JoinComplete from './JoinComplete.vue'

const workspaceStore = useWorkspceStore()
const step = computed(() => workspaceStore.step)
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
