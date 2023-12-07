<template>
  <!-- <Modal v-model:open="isOpen" title="사용자 초대" :width="1000" destroyOnClose>
    <Spin :spinning="isLoading">
      <PostDetail ref="postDetailRef" :data="selectedPost" :isEdit="isEdit" :mode="mode" />
    </Spin>

    <template #footer>
      <template v-if="isEdit">
        <Button
          v-if="mode === modes.U"
          key="cancel"
          @click="onCancel"
          :label="$t('component.button.cancel')"
        />
        <Button
          key="save"
          type="primary"
          @click="onOpenSaveModal"
          :label="$t('component.button.save')"
        />
      </template>
      <Button
        v-else
        key="edit"
        type="primary"
        @click="mode = modes.U"
        :label="$t('component.button.edit')"
      />
      <Button key="close" @click="onCloseModal" :label="$t('component.button.close')" />
    </template>
  </Modal> -->
  사용자 초대 모달
</template>

<script setup lang="ts" name="InviteUsers">
import { Modal, Spin } from 'ant-design-vue'
</script>

<style lang="scss" scoped></style>
