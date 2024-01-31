<template>
  <Transition name="find-user" appear>
    <div class="find-user-container">
      <h1 class="text-title">{{ props.type === 'id' ? '아이디' : '비밀번호' }} 찾기</h1>
      <template v-if="props.type === 'id'">
        <FindIdForm />
      </template>
      <template v-else>
        <FindPasswordForm />
      </template>
    </div>
  </Transition>
</template>

<script setup lang="ts" name="FindUser">
import type { FindUserType } from '../types'
import FindIdForm from './FindIdForm.vue'
import FindPasswordForm from './FindPasswordForm.vue'

interface Props {
  type: FindUserType
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
