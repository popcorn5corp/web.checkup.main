<template>
  <Modal
    class="modal-container"
    v-model:open="isOpen"
    :centered="props.positionCenter"
    :width="500"
    @cancel="emit('cancel')"
    destroyOnClose
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
        <Button
          v-if="useCancelBtn"
          :label="props.cancelBtnText || $t('component.button.cancel')"
          @click="emit('cancel')"
        />
        <Button
          v-if="useOkBtn"
          :label="props.okBtnText || $t('component.button.complete2')"
          :loading="props.isModalLoading"
          :disabled="props.disabledOk"
          type="primary"
          @click="emit('ok')"
        />
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts" name="Modal">
import { Modal } from 'ant-design-vue'
import { ref } from 'vue'
import type { ModalProps } from '../types'
import { Button } from '@/components/button'

const emit = defineEmits(['ok', 'cancel', 'update:isVisible'])
const props = withDefaults(defineProps<ModalProps>(), {
  positionCenter: false,
  useOkBtn: true,
  useCancelBtn: true,
  disabledOk: false
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
    color: $color-gray-7;
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
