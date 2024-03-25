<template>
  <div class="manage-users-container">
    <DrawerContainer
      v-model:openDetail="showDetail"
      :resize="true"
      :floating="false"
      :mask="false"
      :drawerTitle="$t('page.manage.userInfo')"
      drawerWidth="30%"
      resizeOption="float"
    >
      <DynamicTable
        v-model:openDetail="showDetail"
        ref="dynamicTableRef"
        :columns="columns()"
        :row-key="'index'"
        :data-request="getDataSource"
        :column-request="getColumns"
        :filter-request="getFilters"
        :data-callback="dataCallback"
        :content-callback="contentCallback"
        :card-content-callback="cardContentCallback"
        :showDownload="false"
        :showRegist="false"
        :phText="$t('component.ph.userSearchPh')"
        @row-click="onClickRow"
        @row-add="isVisible = true"
        @row-delete="onRemovePost"
      >
        <template #tableBtns>
          <Button
            :label="$t('component.button.invite')"
            size="middle"
            @click="$emit('row-add', (isVisible = true))"
          >
            <template #icon>
              <UserAddOutlined style="color: #1890ff" />
            </template>
          </Button>
        </template>
      </DynamicTable>
      <template #drawerContent>
        <div class="detail-contents">
          <PostDetail
            ref="postDetailRef"
            :workspaceId="getWorkspaceId"
            :workspaceUserId="selectedWSUserId"
            @reload="tableReload"
          />
          <a-tabs
            :destroyInactiveTabPane="true"
            :tabBarGutter="70"
            :tabBarStyle="{ padding: '0 10%', display: 'flex' }"
          >
            <a-tab-pane key="History" :tab="t('page.manage.history')">
              <UserTimeline :workspaceUserId="selectedWSUserId" />
            </a-tab-pane>
          </a-tabs>
        </div>
      </template>
    </DrawerContainer>
    <Modal
      v-if="isVisible"
      @cancel="onCancelModal"
      @ok="onCompleteModal"
      :isModalLoading="isModalLoading"
      class="invite-modal"
    >
      <template #title>{{ $t('page.manage.userInvite') }}</template>
      <template #body>
        <div class="invite-form-wrapper">
          <h4 class="title" style="font-size: 16px">{{ $t('page.manage.emailInvite') }}</h4>
          <InviteMemberForm ref="inviteMemberRef" :isShowDescription="false" :isShowJump="false" />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script setup lang="ts" name="TableSample">
import { ManageUserService } from '@/services'
import { message, Modal as modal } from 'ant-design-vue'
import { createVNode, defineAsyncComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { IManageUser } from '@/services/manage-users/types'

import { useWorkspaceStore } from '@/stores/modules/workspace'

import InviteMemberForm from '@/views/workspace/components/create/InviteMemberForm.vue'

import { DrawerContainer } from '@/components/drawer-container'
import { DynamicTable } from '@/components/dynamic-table'
import { QuestionCircleTwoTone, UserAddOutlined } from '@/components/icons'
import { Modal } from '@/components/modal'

import PostDetail from './components/PostDetail.vue'
import UserTimeline from './components/UserTimeline.vue'
import { getDefaultPost } from './constant'
import { columns } from './mock'

const { t } = useI18n()

const { getWorkspaceId } = useWorkspaceStore()
const selectedUserDetailData = ref(getDefaultPost())
const selectedWSUserId = ref()
const dynamicTableRef = ref<InstanceType<typeof DynamicTable>>()
const inviteMemberRef = ref()

const showDetail = ref(false)
const isVisible = ref(false)
const isModalLoading = ref(false)

const getDataSource = async (param: IManageUser.GetUserListParam) => {
  return await ManageUserService.getUserList(getWorkspaceId || '', param)
}

const getColumns = () => {
  return ManageUserService.getSortableCodes()
}

const getFilters = () => {
  return ManageUserService.getPageInfo()
}

const dataCallback = (data: {
  workspaceUsers: IManageUser.GetUserListRequest['workspaceUsers']
}) => {
  const { workspaceUsers } = data
  return workspaceUsers
}

const contentCallback = (content: IManageUser.GetUserListRequest['workspaceUsers']['content']) => {
  return content
}

const cardContentCallback = (
  content: IManageUser.GetUserListRequest['workspaceUsers']['content']
) => {
  return content.map((r) => {
    return {
      ...r,
      title: r.nickname,
      tag: r.userStatus.label,
      content:
        r.phone &&
        `<div style="display: flex; align-items: center; gap: 8px;"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path fill="#7b828e" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>${r.phone}</div>`,
      date: `${t('common.joinDate')}: ` + r.joinDate
    }
  })
}

const tableReload = () => {
  dynamicTableRef.value?.reload({ isReset: true })
}

const onClickRow = (row: IManageUser.UserInfo): void => {
  showDetail.value = true

  selectedWSUserId.value = row.workspaceUserId
}

const deleteUser = (workspaceUserId: string) => {
  ManageUserService.removeUser(getWorkspaceId, workspaceUserId)
    .then(({ success }) => {
      if (success) {
        tableReload()

        message.success(t('message.deleteSuccess'), 1)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
/**
 * @description 사용자 초대 API 요청
 */
const onCompleteModal = async () => {
  try {
    isModalLoading.value = true
    const inviteEmails = inviteMemberRef.value.tags
    getWorkspaceId &&
      (await ManageUserService.inviteUsers(getWorkspaceId, {
        inviteEmails: inviteEmails
      }))

    message.success(t('message.userInviteSuceess'), 1)

    isVisible.value = false
    isModalLoading.value = false
  } finally {
    inviteMemberRef.value.onInitInviteEmails()
  }
}

/**
 * @description 사용자 삭제 API 요청
 */
const onRemovePost = (selectedRows: IManageUser.UserInfo[]) => {
  modal.confirm({
    title: t('message.modalUserDeleteCheck'),
    icon: createVNode(QuestionCircleTwoTone),
    onOk() {
      deleteUser(selectedRows[0].workspaceUserId)
    }
  })
}

const onCancelModal = (): void => {
  isVisible.value = false
  inviteMemberRef.value.onInitInviteEmails()
}
</script>

<style lang="scss" scoped>
.manage-users-container {
  p {
    margin: 0;
  }

  .invite-form-wrapper {
    small {
      font-size: 13px !important;
    }
  }
  :deep(.invite-modal) {
    :deep(.invite-member-form-container) {
      .form-wrapper small {
        font-size: 13px !important;
      }
    }
  }
}

:deep(.ant-tabs-tab-active) {
  .ant-tabs-tab-btn {
    font-weight: 600 !important;
  }
}

:deep(.ant-tabs-ink-bar) {
  height: 3px !important;
}

:deep(.ant-tabs-nav-wrap) {
  display: flex !important;
  justify-content: space-around !important;
}
</style>
