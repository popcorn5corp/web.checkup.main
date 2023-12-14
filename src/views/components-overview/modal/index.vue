<template>
  <Button label="Open Modal" @click="isVisible = true" />
  <Modal
    v-if="isVisible"
    @cancel="isVisible = false"
    @ok="handleComplete"
    :cancelBtnText="'이전'"
    :okBtnText="'다음'"
    :positionCenter="true"
    :useCancelBtn="false"
  >
    <template #title>사용자 초대</template>
    <template #desciption>이메일로 사용자를 초대해보세요.</template>
    <template #body>
      <div>
        내용내용내용내용내용내용내용내용내용내용...<br />
        내용내용내용내용내용내용내용내용내용내용내용내용...<br />
        내용내용내용내용내용내용내용내용내용내용내용내용내용내용...<br />
      </div>
      <br />
      <h3>중간 타이틀</h3>
      <Select style="width: 100%" />
    </template>
  </Modal>
</template>

<script setup lang="ts" name="ComponentsOverviewModal">
import { Select } from 'ant-design-vue'
import { ref } from 'vue'
import { Button } from '@/components/button'
import { Modal } from '@/components/modal'

const isVisible = ref(false)

const handleComplete = () => {
  isVisible.value = false
}
</script>
