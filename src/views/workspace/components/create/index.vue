<template>
  <div class="transition-group">
    <TransitionGroup name="create" appear>
      <div v-if="step === 1" class="active" key="WorkspaceNameForm">
        <WorkspaceNameForm />
      </div>
      <div v-if="step === 2" class="active" key="NameProfileForm">
        <NameProfileForm />
      </div>
      <div v-if="step === 3" class="active" key="InviteMemberForm">
        <InviteMemberForm />
      </div>
      <div v-if="step === 4" class="active" key="BuisnessTypeForm">
        <BuisnessTypeForm />
      </div>
      <div v-if="step === 5" class="active" key="CreateComplete">
        <CreateComplete />
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useWorkspceStore } from '@/stores/modules/workspace'
import NameProfileForm from '../NameProfileForm.vue'
import BuisnessTypeForm from './BuisnessTypeForm.vue'
import CreateComplete from './CreateComplete.vue'
import InviteMemberForm from './InviteMemberForm.vue'
import WorkspaceNameForm from './WorkspaceNameForm.vue'

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
