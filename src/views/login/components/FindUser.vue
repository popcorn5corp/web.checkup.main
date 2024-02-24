<template>
  <Transition name="find-user" appear>
    <div class="find-user-container">
      <h1 class="text-title">
        {{ props.type === 'id' ? $t('common.findId') : $t('common.findPassword') }}
      </h1>
      <component :is="props.type === 'id' ? FindIdForm : FindPasswordForm" />
    </div>
  </Transition>
</template>

<script setup lang="ts" name="FindUser">
import type { FindUserFormTypes } from '../index.vue'
import FindIdForm from './FindIdForm.vue'
import FindPasswordForm from './FindPasswordForm.vue'

interface Props {
  type: FindUserFormTypes
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="scss" scoped>
.find-user-container {
  width: 100%;
  transition: 0.5s ease-in-out;
}
.ant-radio-group {
  label {
    font-size: 15px;
  }
}
.text-title {
  font-size: 2rem;
  font-weight: 600;
  color: #121212;
  margin: 3rem;
}

// transition
.find-user-enter-from {
  transform: scale(0);
}
.find-user-enter-to {
  transform: scale(1);
}
.find-user-leave-from {
  transform: scale(1);
}

@include xxs {
  .text-title {
    margin: 0px !important;
    margin-bottom: 20px !important;
  }
}
@include xs {
  .text-title {
    margin: 0px !important;
    margin-bottom: 20px !important;
  }
}
</style>
