<template>
  <Button label="Open Modal" @click="isVisible = true" />
  <Modal v-if="isVisible" @close="isVisible = false">
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
    <template #closeBtn>
      <Button label="취소" @click="isVisible = false" />
    </template>
    <template #completeBtn>
      <Button label="완료" type="primary" @click="handleComplete" />
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
