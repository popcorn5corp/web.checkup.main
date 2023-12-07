<template>
  <!-- :filter-request="getFilters" -->
  <DynamicTable
    v-model:openDetail="showDetail"
    ref="dynamicTableRef"
    :row-key="'boardId'"
    :columns="columns"
    :init-param="initParam"
    :data-request="getDataSource"
    :data-callback="dataCallback"
    :column-request="getColumns"
    :deleteBtnLabel="'내보내기'"
    @row-click="onClickRow"
    @row-delete="onRemovePost"
    @row-add="onClickInvite"
  >
    <template #tableBtns>
      <Button
        :label="'내보내기'"
        size="middle"
        @click="$emit('row-delete', tableRef?.selectedRows, tableRef?.selectedRowKeys)"
      >
        <template #icon>
          <DeleteTwoTone />
        </template>
      </Button>
      <Button :label="'초대하기'" size="middle" @click="$emit('row-add')">
        <template #icon>
          <PlusCircleTwoTone />
        </template>
      </Button>
    </template>

    <template #detail-content>
      <div class="detail-contents">
        <div class="profile">
          <div class="img-wrapper">
            <img v-if="profileImg" :src="profileImg" :width="200" :height="200" />
          </div>
          <div class="info"></div>
        </div>
        <div class="tab-wrapper">
          <PostDetail
            v-if="!isLoading && selectedPost"
            ref="postDetailRef"
            :data="selectedPost"
            :isEdit="isEdit"
            :mode="mode"
          />
        </div>
      </div>
    </template>
  </DynamicTable>

  <Modal v-model:open="isOpen" class="invite-modal" :width="1000" destroyOnClose>
    <template #title>
      <h1 style="font-size: 22px; margin-bottom: 1rem">사용자 초대</h1>
    </template>
    <Spin :spinning="isLoading">
      <p style="font-size: 18px">000 워크스페이스로 사용자를 초대해보세요.</p>
      <div class="invite-form-wrapper">
        <h3 class="title">email로 직장동료 추가</h3>
        <InviteMemberForm :isShowDescription="false" />
        <br />
        <h3 class="title">다음 그룹으로 초대</h3>
        <Select />
      </div>
    </Spin>

    <template #footer>
      <Button key="cancel" @click="onCancel" :label="$t('component.button.cancel')" />
      <Popconfirm
        title="사용자를 초대하시겠습니까?"
        ok-text="초대"
        cancel-text="취소"
        placement="topRight"
        @confirm="onOpenSaveModal"
        @cancel="cancel"
      >
        <Button key="save" type="primary" :label="'초대하기'" />
      </Popconfirm>
    </template>
  </Modal>
</template>
<script setup lang="ts" name="TableSample">
import ExcelImage from '@/assets/images/excel.png'
import PdfImage from '@/assets/images/pdf.png'
import PptImage from '@/assets/images/ppt.png'
import { BaseSampleService } from '@/services'
import { Modal, Popconfirm, Spin, message } from 'ant-design-vue'
import { computed, createVNode, ref, unref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IBaseSample } from '@/services/BaseSample/interface'
import InviteMemberForm from '@/views/workspace/components/create/InviteMemberForm.vue'
import { DynamicTable } from '@/components/dynamic-table'
import { QuestionCircleTwoTone } from '@/components/icons'
import { DeleteTwoTone, PlusCircleTwoTone } from '@/components/icons'
import { contentModes as modes } from '@/constants/content'
import PostDetail from './components/PostDetail.vue'
import { getDefaultPost } from './constant'
import { columns } from './mock'

const DEFAULT_MODE = modes.R
const { t } = useI18n()

const dynamicTableRef = ref<InstanceType<typeof DynamicTable>>()
const postDetailRef = ref()
const isOpen = ref(true)
const isLoading = ref(false)
const mode = ref<ContentMode>(DEFAULT_MODE)
const isEdit = computed(() => mode.value === modes.C || mode.value === modes.U)

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
const profileImg = computed(() => {
  const url = unref(selectedPost).boardFiles.length ? unref(selectedPost).boardFiles[0].url : ''

  if (url.includes('.xlsx') || url.includes('.xlsx')) {
    return ExcelImage
  } else if (url.includes('.pdf')) {
    return PdfImage
  } else if (url.includes('.pptx')) {
    return PptImage
  } else {
    return url
  }
})

;(() => {
  BaseSampleService.getPermissionCodes()
})()

const getFilters = () => {
  return BaseSampleService.getPageInfo()
}

/**
 * @description 데이터 테이블 Record 선택 후, 게시물 상세 조회
 * @param row
 */
const onClickRow = (row: IBaseSample.Content): void => {
  showDetail.value = true
  isLoading.value = true
  mode.value = DEFAULT_MODE

  BaseSampleService.getOneById(row.boardId)
    .then(({ success, data }) => {
      if (success) {
        selectedPost.value = data
      }
    })
    .finally(() => {
      isLoading.value = false
    })
}

watch(
  () => unref(showDetail),
  (showDetail) => {
    if (!showDetail) {
      selectedPost.value = getDefaultPost()
    }
  }
)

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
  // Modal.confirm({
  //   content: t('common.message.modalSaveCheck'),
  //   icon: createVNode(QuestionCircleTwoTone),
  //   onOk() {
  //     postDetailRef.value.onSubmit().then(() => {
  //       callServiceByMode(() => {
  //         dynamicTableRef.value?.reload({ isReset: true })
  //         initState()

  //         setTimeout(() => {
  //           message.success(t('common.message.saveSuccess'), 1)
  //         }, 300)
  //       })
  //     })
  //   },
  //   async onCancel() {}
  // })
  ////
  // inviteMemberFormRef.value.onSubmit().then(() => {
  //   callServiceByMode(() => {
  //     dynamicTableRef.value?.reload({ isReset: true })
  //     initState()

  //     setTimeout(() => {
  //       message.success(t('common.message.saveSuccess'), 1)
  //     }, 300)
  //   })
  // })
  initState()
  // success
  message.success(t('common.message.saveSuccess'), 1)
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

      initState()
    },
    async onCancel() {}
  })
}

/**
 * @description Content Mode에 따른 API 호출
 * @param callback
 */
// const callServiceByMode = (callback: Function): void => {
//   const postDetail: IBaseSample.BaseSample = postDetailRef.value.getPostDetail()
//   const { boardId, boardContent, boardFiles, boardTitle, division, permission } = postDetail

//   if (mode.value === modes.C) {
//     BaseSampleService.createOne({
//       boardContent,
//       boardFiles,
//       boardTitle,
//       division,
//       permission
//     }).then(({ success }) => {
//       success && callback()
//     })
//   } else {
//     BaseSampleService.updateOne({
//       boardId,
//       boardContent,
//       boardFiles,
//       boardTitle,
//       division,
//       permission
//     }).then(({ success }) => {
//       success && callback()
//     })
//   }
// }

/**
 * @description 상세 모달 Close
 */
// const onCloseModal = (): void => {
//   if (isEdit.value) {
//     Modal.confirm({
//       content: t('common.message.modalEditCloseCheck'),
//       // width: 600,
//       icon: createVNode(QuestionCircleTwoTone),
//       onOk() {
//         initState()
//       },
//       async onCancel() {}
//     })
//   } else {
//     initState()
//   }
// }

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

const onClickInvite = (): void => {
  isOpen.value = true
  mode.value = modes.C
  selectedPost.value = getDefaultPost()
}
</script>

<style lang="scss" scoped>
.detail-contents {
  .profile {
    display: flex;
    padding: 10px;
    .img-wrapper {
      flex: 1;

      > img {
        border: 1px solid $color-gray-5;
        border-radius: 10px;
      }
    }

    .info {
      flex: 1;
      // background-color: aliceblue;
    }
  }

  .tab-wrapper {
    padding: 10px;
  }
}

.invite-form-wrapper {
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 1rem;
}

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
