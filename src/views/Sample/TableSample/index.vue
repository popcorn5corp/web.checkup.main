<script setup lang="ts" name="TableSample">
import { computed, createVNode, ref, watch } from 'vue'
import { Spin, Modal, message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import _ from 'lodash-es'

import BaseSampleService from '@/services/BaseSample/index'
import type { IBaseSample, SortCodesResponse } from '@/services/BaseSample/interface'

import DynamicTable from '@/components/Table'
import { columns } from '@/components/Table/mock'
import { QuestionCircleTwoTone } from '@/components/Icon'
import PostDetail from './components/PostDetail.vue'
import { contentModes as modes } from '@/constants/content'
import { getDefaultPost } from './constant';

const DEFAULT_MODE = modes.R;

const { t } = useI18n()
const dynamicTableInstance = ref();
const postDetailRef = ref();
const isOpen = ref(false);
const isLoading = ref(false);
const mode = ref<ContentMode>(DEFAULT_MODE);
const isEdit = computed(() => mode.value === modes.C || mode.value === modes.U);
const title = computed(() => {
  if (mode.value === modes.C) {
    return t('common.postRegist');
  } else if (mode.value === modes.U) {
    return t('common.postModify')
  } else {
    return t('common.postRead')
  }
});

const initParam = ref<IBaseSample.BaseSamplesParam>({
  searchEndDate: '',
  searchStartDate: '',
  searchWord: '',
  size: 10,
  page: 1,
  division: 'PUBLIC',
  sort: undefined,
})

const selectedPost = ref<IBaseSample.BaseSample>(getDefaultPost())

/**
 * @description 데이터 테이블 Record 선택 후, 게시물 상세 조회 
 * @param row 
 */
const onClickRow = (row: IBaseSample.Content) => {
  isOpen.value = true;
  isLoading.value = true;
  mode.value = DEFAULT_MODE;

  BaseSampleService.getOneById(row.boardId).then(content => {
    selectedPost.value = content;

    setTimeout(() => {
      isLoading.value = false;
    }, 200)
  })
}

/**
 * @description 데이터 테이블이 제공하는 기능으로, 리스트 조회 API 를 리턴하여 넘긴다
 * @param param 
 */
const getDataSource = (param: IBaseSample.BaseSamplesParam) => {
  return BaseSampleService.getAll(param)
}

/**
 * @description 데이터 테이블 조회 이후 테이블에 바인딩하기 전, 데이터에 대한 전치리
 * @param data 
 */
const dataCallback = (data: IBaseSample.BaseSamples['posts']['content']) => {
  return data;
}

/**
 * 
 */
const getColumns = (): Promise<SortCodesResponse> => {
  return BaseSampleService.getSortableCodes();
}

/**
 * @description 게시물 수정
 */
const onOpenSaveModal = (): void => {
  Modal.confirm({
    content: t('common.message.modalSaveCheck'),
    icon: createVNode(QuestionCircleTwoTone),
    onOk() {
      postDetailRef.value.onSubmit().then(() => {
        callServiceByMode(() => {
          dynamicTableInstance.value.refetch({ isReset: true });
          initState();

          setTimeout(() => {
            message.success(t('common.message.saveSuccess'), 1);
          }, 300)
        })
      })
    },
    async onCancel() {

    }
  });
}

/**
 * @description 게시물 삭제
 * @param selectedRows 
 */
const onRemovePost = (selectedRows: IBaseSample.Content[]): void => {
  Modal.confirm({
    content: t('common.message.modalDeleteCheck'),
    // width: 600,
    icon: createVNode(QuestionCircleTwoTone),
    onOk() {
      BaseSampleService.deleteOne(selectedRows[0].boardId).then(response => {
        dynamicTableInstance.value.refetch({ isReset: true });

        setTimeout(() => {
          message.success(t('common.message.deleteSuccess'), 1);
        }, 300)
      })
      initState();
    },
    async onCancel() {

    }
  })
}

/**
 * @description Content Mode에 따른 API 호출
 * @param callback 
 */
const callServiceByMode = (callback: Function): void => {
  const postDetail: IBaseSample.BaseSample = postDetailRef.value.getPostDetail();

  if (mode.value === modes.C) {
    const { boardId, ...param } = postDetail;

    BaseSampleService.createOne(param).then((response) => {
      callback()
    })
  } else {
    BaseSampleService.updateOne(postDetail).then(response => {
      callback()
    })
  }
}

/**
 * @description 상세 모달 Close
 */
const onCloseModal = (): void => {
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

/**
 * @description 수정모드에서 취소할 경우, 이전 정보로 Rollback
 */
const onCancel = (): void => {
  mode.value = DEFAULT_MODE;
  postDetailRef.value.rollbackPost();
}

const initState = (): void => {
  isOpen.value = false;
  mode.value = DEFAULT_MODE;
}

const onClickRegist = (): void => {
  isOpen.value = true;
  mode.value = modes.C;
  selectedPost.value = getDefaultPost();
}

</script>

<template>
  <DynamicTable :row-key="'boardId'" ref="dynamicTableInstance" :columns="columns" :data-request="getDataSource"
    :data-callback="dataCallback" :init-columns="columns" :column-request="getColumns" :init-param="initParam"
    @row-click="onClickRow" @row-select="onRemovePost" @rowAdd="onClickRegist">
    <template #tableBtns="scope">
      <!-- <Button :label="$t('common.delete')" size="large" />
      <Button :label="$t('common.registration')" size="large" @click="onClickRegist" /> -->
    </template>
  </DynamicTable>

  <Modal v-model:open="isOpen" :title="title" :width="650" destroyOnClose>
    <Spin :spinning="isLoading">
      <PostDetail ref="postDetailRef" :data="selectedPost" :isEdit="isEdit" :mode="mode" />
    </Spin>

    <template #footer>
      <template v-if="isEdit">
        <Button v-if="mode === modes.U" key="cancel" @click="onCancel" label="취소" />
        <Button key="save" type="primary" @click="onOpenSaveModal" label="저장" />
      </template>
      <Button v-else key="edit" type="primary" @click="mode = modes.U" label="수정" />
      <Button key="close" @click="onCloseModal" label="닫기" />
    </template>
  </Modal>
</template>
<style lang="scss" scoped></style>
