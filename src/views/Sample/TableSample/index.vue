<script setup lang="ts" name="TableSample">
import { BaseSampleService } from '@/services'
import { Modal, Spin, message } from 'ant-design-vue'
import { computed, createVNode, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import type { IBaseSample } from '@/services/BaseSample/interface'
import { Drawer } from '@/components/Drawer'
import { Button } from '@/components/button'
import { DynamicTable } from '@/components/dynamic-table'
import { QuestionCircleTwoTone } from '@/components/icons'
import { TabPane, Tabs } from '@/components/tabs'
import { contentModes as modes } from '@/constants/content'
import PostDetail from './components/PostDetail.vue'
import TableDetailForm from './components/TableDetailForm.vue'
import TableLayoutForm from './components/TableLayoutForm.vue'
import { getDefaultPost } from './constant'
import { columns } from './mock'

const DEFAULT_MODE = modes.R

const { t } = useI18n()
const dynamicTableRef = ref<InstanceType<typeof DynamicTable>>()
const postDetailRef = ref()
const isOpen = ref(false)
const openDrawer = ref(false)
const isLoading = ref(false)
const mode = ref<ContentMode>(DEFAULT_MODE)
const isEdit = computed(() => mode.value === modes.C || mode.value === modes.U)
const title = computed(() => {
  if (mode.value === modes.C) {
    return t('common.postRegist')
  } else if (mode.value === modes.U) {
    return t('common.postModify')
  } else {
    return t('common.postRead')
  }
})

const showDetail = ref(false)
const initParam = ref<IBaseSample.BaseSamplesParam>({
  searchEndDate: '',
  searchStartDate: '',
  searchWord: '',
  searchDivision: '',
  searchPermission: '',
  size: 10,
  page: 1,
  sort: undefined
})

const selectedPost = ref<IBaseSample.BaseSample>(getDefaultPost())
// const filters = ref([])

// ;(() => {
//   BaseSampleService.getPageInfo().then(({ data, success }: any) => {
//     if (success) {
//       filters.value = data.filters
//     }
//   })
// })()

const getFilters = () => {
  return BaseSampleService.getPageInfo()
}

/**
 * @description 데이터 테이블 Record 선택 후, 게시물 상세 조회
 * @param row
 */
const onClickRow = (row: IBaseSample.Content): void => {
  // openDrawer.value = true
  showDetail.value = true
  // isOpen.value = true
  console.log('click row :: ', openDrawer.value)
  isLoading.value = true
  mode.value = DEFAULT_MODE

  BaseSampleService.getOneById(row.boardId).then(({ success, data }) => {
    if (success) {
      selectedPost.value = data
    }

    setTimeout(() => {
      isLoading.value = false
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
  return data
}

const getColumns = () => {
  return BaseSampleService.getSortableCodes()
}

/**
 * @description 게시물 등록 및 수정
 */
const onOpenSaveModal = (): void => {
  Modal.confirm({
    content: t('common.message.modalSaveCheck'),
    icon: createVNode(QuestionCircleTwoTone),
    onOk() {
      postDetailRef.value.onSubmit().then(() => {
        callServiceByMode(() => {
          dynamicTableRef.value?.reload({ isReset: true })
          initState()

          setTimeout(() => {
            message.success(t('common.message.saveSuccess'), 1)
          }, 300)
        })
      })
    },
    async onCancel() {}
  })
}

/**
 * @description 게시물 삭제
 * @param selectedRows
 */
const onRemovePost = (selectedRows: IBaseSample.Content[], selectedRowKeys: string[]): void => {
  Modal.confirm({
    content: t('common.message.modalDeleteCheck'),
    // width: 600,
    icon: createVNode(QuestionCircleTwoTone),
    onOk() {
      const params = {
        boardIds: selectedRowKeys
      }

      BaseSampleService.deleteByIds(params).then(({ success }) => {
        if (success) {
          dynamicTableRef.value?.reload({ isReset: true })

          setTimeout(() => {
            message.success(t('common.message.deleteSuccess'), 1)
          }, 300)
        }
      })

      // BaseSampleService.deleteOne(selectedRows[0].boardId).then(({ success }) => {
      //   if (success) {
      //     dynamicTableRef.value?.reload({ isReset: true })

      //     setTimeout(() => {
      //       message.success(t('common.message.deleteSuccess'), 1)
      //     }, 300)
      //   }
      // })
      initState()
    },
    async onCancel() {}
  })
}

/**
 * @description Content Mode에 따른 API 호출
 * @param callback
 */
const callServiceByMode = (callback: Function): void => {
  const postDetail: IBaseSample.BaseSample = postDetailRef.value.getPostDetail()
  const { boardId, boardContent, boardFiles, boardTitle, division, permission } = postDetail

  if (mode.value === modes.C) {
    BaseSampleService.createOne({
      boardContent,
      boardFiles,
      boardTitle,
      division,
      permission
    }).then(({ success }) => {
      success && callback()
    })
  } else {
    BaseSampleService.updateOne({
      boardId,
      boardContent,
      boardFiles,
      boardTitle,
      division,
      permission
    }).then(({ success }) => {
      success && callback()
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
        initState()
      },
      async onCancel() {}
    })
  } else {
    initState()
  }
}

/**
 * @description 수정모드에서 취소할 경우, 이전 정보로 Rollback
 */
const onCancel = (): void => {
  mode.value = DEFAULT_MODE
  postDetailRef.value.rollbackPost()
}

const initState = (): void => {
  isOpen.value = false
  mode.value = DEFAULT_MODE
}

const onClickRegist = (): void => {
  isOpen.value = true
  mode.value = modes.C
  selectedPost.value = getDefaultPost()
}
</script>

<template>
  <TableLayoutForm v-model:openDetail="showDetail">
    <DynamicTable
      ref="dynamicTableRef"
      :row-key="'boardId'"
      :columns="columns"
      :filter-request="getFilters"
      :init-param="initParam"
      :data-request="getDataSource"
      :data-callback="dataCallback"
      :column-request="getColumns"
      @row-click="onClickRow"
      @row-delete="onRemovePost"
      @row-add="onClickRegist"
    >
      <template #tableBtns="scope">
        <!-- <Button :label="$t('common.delete')" size="large" @click="onRemovePost" />
      <Button :label="$t('common.registration')" size="large" @click="onClickRegist" /> -->
      </template>
    </DynamicTable>

    <template #detail-content>
      <div>상세 Content 영역</div>
    </template>
  </TableLayoutForm>

  <!-- <div class="detail-wrapper">
    <div class="title">상세 영역</div>
    <div>
      <Button :label="'Close'" />
    </div>
  </div> -->

  <Drawer v-model:open="openDrawer" />

  <Modal v-model:open="isOpen" :title="title" :width="1000" destroyOnClose>
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
  </Modal>
</template>
<style lang="scss" scoped>
// .detail-wrapper {
//   flex: 2;
//   background-color: $color-white;
//   // height: 100%;
//   position: absolute;
//   width: 500px;
//   z-index: 2;
//   right: 0;
//   height: 100%;
//   margin-right: -15px;
//   margin-top: -15px;

//   border: 0.5px solid $color-gray-4;

//   > .title {
//     display: flex;
//     font-size: 16px;
//     font-weight: bold;
//     justify-content: space-between;
//     padding: 18.5px;
//     align-items: end;
//   }

//   :deep(.ant-divider) {
//     margin: 0;
//   }
// }
</style>
