<template>
  <Modal
    class="modal-container"
    :width="500"
    destroyOnClose
    v-model:open="isOpen"
    :centered="props.positionCenter"
    @cancel="emit('cancel')"
  >
    <template #title>
      <div class="modal-title">
        <slot name="title"></slot>
      </div>
    </template>
    <div class="modal-desc">
      <slot name="desciption"></slot>
    </div>
    <div class="modal-body">
      <slot name="body"></slot>
    </div>

    <template #footer>
      <div class="modal-btns-wrapper">
        <Button v-if="useCancelBtn" :label="props.cancelBtnText" @click="emit('cancel')" />
        <Button v-if="useOkBtn" :label="props.okBtnText" type="primary" @click="emit('ok')" />
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts" name="Modal">
import { Modal } from 'ant-design-vue'
import { ref } from 'vue'

const emit = defineEmits(['ok', 'cancel', 'update:isVisible'])
const props = defineProps({
  positionCenter: {
    type: Boolean,
    default: false
  },

  okBtnText: {
    type: String,
    default: '완료'
  },
  useOkBtn: {
    type: Boolean,
    default: true
  },

  cancelBtnText: {
    type: String,
    default: '취소'
  },
  useCancelBtn: {
    type: Boolean,
    default: true
  }
})
const isOpen = ref(true)
</script>

<style lang="scss" scoped>
.modal-container {
  width: 100%;
  .modal-title {
    text-align: center;
    font-size: 20px;
    margin-top: 10px;
  }
  .modal-desc {
    color: $sub-text-dark-gray-color;
    text-align: center;
  }
  .modal-body {
    margin: 25px 0 30px;
    :deep(.ant-modal-content) {
      padding: 34px 25px 1rem;
    }
  }
  .modal-btns-wrapper {
    width: 70%;
    margin: 0 auto;
    text-align: center;
    :deep(.ant-btn) {
      width: 48%;
    }
  }
}
</style>
