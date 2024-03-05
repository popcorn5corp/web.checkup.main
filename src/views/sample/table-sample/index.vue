<template>
  <DrawerContainer
    v-model:openDetail="showDetail"
    :resize="true"
    :floating="false"
    :mask="false"
    :drawerTitle="$t('page.manage.userInfo')"
    resizeOption="push"
    drawerWidth="30%"
    drawerPosition="right"
  >
    <DynamicTable
      v-model:openDetail="showDetail"
      ref="dynamicTableRef"
      :row-key="'boardId'"
      :columns="columns"
      :filter-request="getFilters"
      :data-request="getDataSource"
      :column-request="getColumns"
      :data-callback="dataCallback"
      :content-callback="contentCallback"
      :card-content-callback="cardContentCallback"
      @row-click="onClickRow"
      @row-delete="onRemovePost"
      @row-add="onClickRegist"
    />

    <template #drawerContent>
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
  </DrawerContainer>

  <Modal v-model:open="isOpen" :title="title" :width="500" destroyOnClose>
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
<script setup lang="ts" name="TableSample">
import ExcelImage from '@/assets/images/excel.png'
import PdfImage from '@/assets/images/pdf.png'
import PptImage from '@/assets/images/ppt.png'
import { BaseSampleService } from '@/services'
import { Modal, Spin, message } from 'ant-design-vue'
import { computed, createVNode, ref, unref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IBaseSample } from '@/services/base-sample/types'
import { Button } from '@/components/button'
import { DrawerContainer } from '@/components/drawer-container'
import { DynamicTable } from '@/components/dynamic-table'
import { QuestionCircleTwoTone } from '@/components/icons'
import { contentModes as modes } from '@/constants/content'
import PostDetail from './components/PostDetail.vue'
import { getDefaultPost } from './constant'
import { columns, filters } from './mock'

const DEFAULT_MODE = modes.R
const { t } = useI18n()
const dynamicTableRef = ref<InstanceType<typeof DynamicTable>>()
const postDetailRef = ref()
const isOpen = ref(false)
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
  // openDrawer.value = true
  showDetail.value = true
  // isOpen.value = true
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
 * @description 데이터 테이블 조회 이후 data에 대한 전치리
 * @param data
 */
const dataCallback = (data: { posts: IBaseSample.BaseSamples['posts'] }) => {
  const { posts } = data
  return posts
}

/**
 * @description 데이터 테이블 조회 이후 content에 대한 전처리
 * @param content
 */
const contentCallback = (content: IBaseSample.BaseSamples['posts']['content']) => {
  return content
}

/**
 * @description 카드 리스트 정보 대응을 위한 content에 대한 전처리
 * @param content
 */
const cardContentCallback = (content: IBaseSample.BaseSamples['posts']['content']) => {
  return content.map((r) => {
    return {
      ...r,
      title: r.boardTitle,
      tag: r.division,
      content: r.boardContent
      // 포맷 안 거쳐도 되는 날짜 데이터
      // date: r.joinDate
    }
  })
}

const getColumns = () => {
  return BaseSampleService.getSortableCodes()
}

/**
 * @description 게시물 등록 및 수정
 */
const onOpenSaveModal = (): void => {
  Modal.confirm({
    content: t('message.modalSaveCheck'),
    icon: createVNode(QuestionCircleTwoTone),
    onOk() {
      postDetailRef.value.onSubmit().then(() => {
        callServiceByMode(() => {
          dynamicTableRef.value?.reload({ isReset: true })
          initState()

          setTimeout(() => {
            message.success(t('message.saveSuccess'), 1)
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
    content: t('message.modalDeleteCheck'),
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
            message.success(t('message.deleteSuccess'), 1)
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
      content: t('message.modalEditCloseCheck'),
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
    }
  }

  .tab-wrapper {
    padding: 10px;
  }
}
</style>
