<template>
  <div class="manage-users-container">
    <DynamicTable
      v-model:openDetail="showDetail"
      ref="dynamicTableRef"
      :row-key="'boardId'"
      :columns="columns"
      :init-param="initParam"
      :data-request="getDataSource"
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
        <Button :label="'초대하기'" size="middle" @click="$emit('row-add', (isVisible = true))">
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
              :data="selectedPost"
              :isEdit="isEdit"
              :mode="mode"
            />
          </div>
        </div>
      </template>
    </DynamicTable>

    <Modal v-if="isVisible" @close="isVisible = false" class="invite-modal">
      <template #title>사용자 초대</template>
      <template #body>
        <Spin :spinning="isLoading">
          <div class="invite-form-wrapper">
            <h4 class="title">이메일로 직장동료 추가</h4>
            <InviteMemberForm ref="inviteMemberRef" :isShowDescription="false" />
            <br />
            <h4 class="title">다음 그룹으로 초대</h4>
            <Select />
          </div>
        </Spin>
      </template>
      <template #closeBtn>
        <Button @click="onCancelModal" :label="$t('component.button.cancel')" />
      </template>
      <template #completeBtn>
        <Button key="save" type="primary" :label="'완료'" @click="onCompleteModal" />
      </template>
    </Modal>
  </div>
</template>
<script setup lang="ts" name="TableSample">
import ExcelImage from '@/assets/images/excel.png'
import PdfImage from '@/assets/images/pdf.png'
import PptImage from '@/assets/images/ppt.png'
import { BaseSampleService, ManageUserService } from '@/services'
import { Spin, message } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { computed, createVNode, ref, unref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IManageUser } from '@/services/manage-users/interface'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import InviteMemberForm from '@/views/workspace/components/create/InviteMemberForm.vue'
import { DynamicTable } from '@/components/dynamic-table'
import { QuestionCircleTwoTone } from '@/components/icons'
import { DeleteTwoTone, PlusCircleTwoTone } from '@/components/icons'
import { Modal } from '@/components/modal'
import { contentModes as modes } from '@/constants/content'
import PostDetail from './components/PostDetail.vue'
import { getDefaultPost } from './constant'
import { columns } from './mock'

const DEFAULT_MODE = modes.R
const { t } = useI18n()

const mode = ref<ContentMode>(DEFAULT_MODE)
const dynamicTableRef = ref<InstanceType<typeof DynamicTable>>()
const inviteMemberRef = ref()
const { getWorkspace } = storeToRefs(useWorkspaceStore())

const showDetail = ref(false)
const isVisible = ref(false)
const isLoading = ref(false)

const isEdit = computed(() => mode.value === modes.C || mode.value === modes.U)

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

watch(
  () => unref(showDetail),
  (showDetail) => {
    if (!showDetail) {
      selectedPost.value = getDefaultPost()
    }
  }
)

const getDataSource = (workspaceId: string, param: IManageUser.UserListParam) => {
  return ManageUserService.getUserList({ workspaceId: getWorkspace.workspaceId, param })
}

const getFilters = () => {
  return BaseSampleService.getPageInfo()
}

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

const onCompleteModal = async () => {
  try {
    // 엔터 칠 때
    // const {data} = ManageUserService.checkDuplicatedEmail()
    const inviteEmails = inviteMemberRef.value.tags
    console.log('ref', inviteEmails)

    // 사용자 초대
    const { data } = await ManageUserService.inviteUsers(inviteEmails)
    console.log('사용자 초대--> ', data)
    message.success(t('common.message.saveSuccess'), 1)
    initState()
  } finally {
    inviteMemberRef.value.onInitInviteEmails()
  }
}

const onCancelModal = (): void => {
  isVisible.value = false
  inviteMemberRef.value.onInitInviteEmails()
}

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

const initState = (): void => {
  isVisible.value = false
  mode.value = DEFAULT_MODE
}

const onClickInvite = (): void => {
  isVisible.value = true
  mode.value = modes.C
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
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
  .title {
    font-weight: 600;
  }
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
