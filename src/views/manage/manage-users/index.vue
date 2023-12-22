<template>
  <div class="manage-users-container">
    <DynamicTable
      v-model:openDetail="showDetail"
      ref="dynamicTableRef"
      :columns="columns"
      :row-key="'index'"
      :data-request="getDataSource"
      :column-request="getColumns"
      :filter-request="getFilters"
      :data-callback="dataCallback"
      :content-callback="contentCallback"
      :card-content-callback="cardContentCallback"
      :showDownload="false"
      :showRegist="false"
      @row-click="onClickRow"
      @row-add="onClickInvite"
    >
      <template #tableBtns>
        <Button :label="'내보내기'" size="middle" @click="$emit('row-delete')">
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

      <template #detail-title>
        <span>사용자 정보</span>
      </template>
      <template #detail-content>
        <div class="detail-contents">
          <PostDetail ref="postDetailRef" :data="selectedPost" :isEdit="isEdit" :mode="mode" />
          <div class="tab-wrapper">
            <a-tabs v-model:activeKey="activeKey">
              <a-tab-pane key="1" tab="상세보기"> </a-tab-pane>

              <a-tab-pane key="2" tab="타임라인" force-render> </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </template>
    </DynamicTable>

    <Modal
      v-if="isVisible"
      @cancel="onCancelModal"
      @ok="onCompleteModal"
      :isModalLoading="isModalLoading"
      class="invite-modal"
    >
      <template #title>사용자 초대</template>
      <template #body>
        <div class="invite-form-wrapper">
          <h4 class="title">이메일로 직장동료 추가</h4>
          <InviteMemberForm ref="inviteMemberRef" :isShowDescription="false" />
          <br />
          <h4 class="title">다음 그룹으로 초대</h4>
        </div>
      </template>
    </Modal>
  </div>
</template>
<script setup lang="ts" name="TableSample">
import { ManageUserService } from '@/services'
import { Spin, message } from 'ant-design-vue'
import { computed, ref, unref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IManageUser } from '@/services/manage-users/interface'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import InviteMemberForm from '@/views/workspace/components/create/InviteMemberForm.vue'
import { DynamicTable } from '@/components/dynamic-table'
import { DeleteTwoTone, PlusCircleTwoTone } from '@/components/icons'
import { Modal } from '@/components/modal'
import { contentModes as modes } from '@/constants/content'
import PostDetail from './components/PostDetail.vue'
import { getDefaultPost } from './constant'
import { columns } from './mock'

const { t } = useI18n()
const DEFAULT_MODE = modes.R

const mode = ref<ContentMode>(DEFAULT_MODE)
const dynamicTableRef = ref<InstanceType<typeof DynamicTable>>()
const inviteMemberRef = ref()
const { getWorkspace } = useWorkspaceStore()
const workspaceId = computed(() => getWorkspace.workspaceId)

const showDetail = ref(false)
const isVisible = ref(false)
const isLoading = ref(false)
const isModalLoading = ref(false)

const isEdit = computed(() => mode.value === modes.C || mode.value === modes.U)

watch(
  () => unref(showDetail),
  (showDetail) => {
    if (!showDetail) {
      selectedPost.value = getDefaultPost()
    }
  }
)

const selectedPost = ref<IManageUser.UserListRequest>(getDefaultPost())

const getDataSource = (param: IManageUser.UserListParam) => {
  return ManageUserService.getUserList(workspaceId.value, param)
}

const getColumns = () => {
  return ManageUserService.getSortableCodes()
}

const getFilters = () => {
  return ManageUserService.getPageInfo()
}

const dataCallback = (data: { workspaceUsers: IManageUser.UserListRequest['workspaceUsers'] }) => {
  const { workspaceUsers } = data
  return workspaceUsers
}

const contentCallback = (content: IManageUser.UserListRequest['workspaceUsers']['content']) => {
  return content
}

const cardContentCallback = (content: IManageUser.UserListRequest['workspaceUsers']['content']) => {
  return content.map((r) => {
    return {
      ...r,
      title: r.nickname,
      tag: r.userStatus.label,
      content:
        r.phone &&
        `<div style="display: flex; align-items: center; gap: 8px;"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path fill="#7b828e" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>${r.phone}</div>`,
      date: '가입일: ' + r.joinDate
    }
  })
}

const onClickRow = (row: IManageUser.UserInfo): void => {
  showDetail.value = true
  isLoading.value = true
  mode.value = DEFAULT_MODE

  ManageUserService.getOneById(workspaceId.value, row.workspaceUserId)
    .then(({ success, data }) => {
      if (success) {
        selectedPost.value = {
          ...row,
          ...data
        }
      }
    })
    .finally(() => {
      isLoading.value = false
    })
}

const onCompleteModal = async () => {
  try {
    isModalLoading.value = true
    // 사용자 초대
    const inviteEmails = inviteMemberRef.value.tags
    await ManageUserService.inviteUsers(workspaceId.value, {
      inviteEmails: inviteEmails
    })
    message.success(t('common.message.saveSuccess'), 1)
    initState()

    isModalLoading.value = false
  } finally {
    inviteMemberRef.value.onInitInviteEmails()
  }
}

const onCancelModal = (): void => {
  isVisible.value = false
  inviteMemberRef.value.onInitInviteEmails()
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
.tab-wrapper {
  padding: 10px;
}
</style>
