<script setup lang="ts" name="TableSample">
import { computed, createVNode, reactive, ref, type UnwrapRef, nextTick } from 'vue'
import { Spin, Modal, message } from 'ant-design-vue'
import DynamicTable from '@/components/Table'
import { columns } from '@/components/Table/mock'
import BaseSampleService from '@/services/BaseSample/index'
import type { IBaseSample } from '@/services/BaseSample/interface'
import { FilterTable } from '@/components/Table'
import PostDetail from './components/PostDetail.vue'
import { useI18n } from 'vue-i18n'
import { QuestionCircleTwoTone } from '@/components/Icon'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import _ from 'lodash-es'

const { t } = useI18n()
const postDetailRef = ref();
const isOpen = ref(false);
const isLoading = ref(false);
const isEdit = ref(false);
const title = computed(() => isEdit.value ? t('common.postModify') : t('common.postRead'));
const initParam = ref<IBaseSample.BaseSamplesParam>({
  searchEndDate: '',
  searchStartDate: '',
  searchWord: '',
  size: 5,
  page: 1,
  division: ''
})
let searchParam: IBaseSample.BaseSamplesParam = {
  ...initParam.value
}

const selectedContent = ref<IBaseSample.BaseSample>()
const onClickRow = (row: IBaseSample.Content) => {
  isOpen.value = true;
  isLoading.value = true;

  BaseSampleService.getOneById(row.boardId).then(content => {
    selectedContent.value = content;

    setTimeout(() => {
      isLoading.value = false;
    }, 200)
  })
}

const getDataSource = (param: IBaseSample.BaseSamplesParam) => {
  searchParam = param;
  return BaseSampleService.getAll(param);
}

const dataCallback = (data: IBaseSample.BaseSamples['posts']['content']) => {
  return data;
}

const onSavePost = async () => {
  Modal.confirm({
    content: t('common.message.modalEditCheck'),
    icon: createVNode(QuestionCircleTwoTone),
    onOk() {
      const postDetail = postDetailRef.value.getPostDetail();

      BaseSampleService.updateOne(postDetail).then(response => {
        initState();
        initParam.value = searchParam;

        setTimeout(() => {
          message.success(t('common.message.saveSuccess'), 1);
        }, 300)
      })
    },
    async onCancel() {

    }
  });
}

const onCloseModal = () => {
  if (isEdit.value) {
    Modal.confirm({
      content: t('common.message.modalEditCloseCheck'),
      // width: 600,
      icon: createVNode(QuestionCircleTwoTone),
      onOk() {
        initState();
      },
      async onCancel() {

      }
    })
  } else {
    initState();
  }
}

const onCancel = () => {
  isEdit.value = false;
  postDetailRef.value.rollbackPost();
}

const initState = () => {
  isOpen.value = false;
  isEdit.value = false;
}

const onEditPost = () => {
  isEdit.value = true;
}

const onRemovePost = () => {

}

</script>

<template>
  <DynamicTable :columns="columns" :request="getDataSource" :dataCallback="dataCallback" :initParam="initParam"
    @rowClick="onClickRow">
    <template #tableBtns>
      <Button :label="$t('common.delete')" size="large" />
      <Button :label="$t('common.registration')" size="large" />
    </template>
  </DynamicTable>

  <Modal v-model:open="isOpen" :title="title" :width="650">
    <Spin :spinning="isLoading">
      <PostDetail ref="postDetailRef" v-if="selectedContent" :data="selectedContent" :isEdit="isEdit" />
    </Spin>

    <template #footer>
      <template v-if="isEdit">
        <Button key="cancel" @click="onCancel" label="취소" />
        <Button key="save" type="primary" @click="onSavePost" label="저장" />
      </template>
      <Button v-else key="edit" type="primary" @click="onEditPost" label="수정" />
      <Button key="close" @click="onCloseModal" label="닫기" />
    </template>
  </Modal>
</template>
<style lang="scss" scoped></style>
