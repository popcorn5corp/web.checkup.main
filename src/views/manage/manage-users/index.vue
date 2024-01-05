<template>
  <div class="manage-users-container">
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
      :phText="$t('page.manage.ph.userSearchPh')"
      :deleteBtnText="$t('page.manage.export')"
      @row-click="onClickRow"
      @row-add="isVisible = true"
      @row-delete="onRemovePost"
    >
      <template #tableBtns>
        <Button
          :label="$t('page.manage.invite')"
          size="middle"
          @click="$emit('row-add', (isVisible = true))"
        >
          <template #icon>
            <UserAddOutlined style="color: #1890ff" />
          </template>
        </Button>
      </template>

      <template #detail-title>
        <span>{{ $t('page.manage.userInfo') }}</span>
      </template>
      <template #detail-content>
        <div class="detail-contents">
          <PostDetail ref="postDetailRef" :data="selectedUserDetailData" />
          <a-tabs
            v-model:active-key="activeKey"
            :destroyInactiveTabPane="true"
            :tabBarGutter="70"
            :tabBarStyle="{ padding: '0 10%', display: 'flex' }"
          >
            <a-tab-pane v-for="(tab, index) in tabInfo" :key="tab.key" :tab="tab.title">
              <component :is="tab.component" :workspaceUserId="selectedWSUserId" />
            </a-tab-pane>
          </a-tabs>
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
      <template #title>{{ $t('page.manage.userInvite') }}</template>
      <template #body>
        <div class="invite-form-wrapper">
          <h4 class="title">{{ $t('page.manage.emailInvite') }}</h4>
          <InviteMemberForm ref="inviteMemberRef" :isShowDescription="false" :isShowJump="false" />
          <!-- TODO 추후개발 -->
          <!-- <br />
          <h4 class="title">다음 그룹으로 초대</h4> -->
        </div>
      </template>
    </Modal>
  </div>
</template>
<script setup lang="ts" name="TableSample">
import { ManageUserService } from '@/services'
import { message, Modal as modal } from 'ant-design-vue'
import { createVNode, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IManageUser } from '@/services/manage-users/interface'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import InviteMemberForm from '@/views/workspace/components/create/InviteMemberForm.vue'
import { DynamicTable } from '@/components/dynamic-table'
import { QuestionCircleTwoTone, UserAddOutlined } from '@/components/icons'
import { Modal } from '@/components/modal'
import PostDetail from './components/PostDetail.vue'
import UserDetail from './components/UserDetail.vue'
import UserHistory from './components/UserHistory.vue'
import { getDefaultPost } from './constant'
import { columns } from './mock'

const { t } = useI18n()
const tabInfo = {
  Detail: {
    key: 'Detail',
    title: t('page.manage.detail'),
    component: UserDetail
  },
  History: {
    key: 'History',
    title: t('page.manage.history'),
    component: UserHistory
  }
}

const { getWorkspaceId } = useWorkspaceStore()
const selectedUserDetailData = ref(getDefaultPost())
const selectedWSUserId = ref()
const dynamicTableRef = ref<InstanceType<typeof DynamicTable>>()
const inviteMemberRef = ref()

const showDetail = ref(false)
const isVisible = ref(false)
const isModalLoading = ref(false)
const activeKey = ref(tabInfo.Detail.key)

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
      date: `${t('page.manage.joinDate')}: ` + r.joinDate
    }
  })
}

const onClickRow = (row: IManageUser.UserInfo): void => {
  showDetail.value = true
  activeKey.value = tabInfo.Detail.key

  selectedUserDetailData.value = row
  selectedWSUserId.value = row.workspaceUserId
}

/**
 * @description 사용자 초대 API 요청
 */
const onCompleteModal = async () => {
  try {
    isModalLoading.value = true
    // 사용자 초대
    const inviteEmails = inviteMemberRef.value.tags
    getWorkspaceId &&
      (await ManageUserService.inviteUsers(getWorkspaceId, {
        inviteEmails: inviteEmails
      }))
    message.success('초대가 완료되었습니다.', 1)
    isVisible.value = false
    isModalLoading.value = false
  } finally {
    inviteMemberRef.value.onInitInviteEmails()
  }
}

/**
 * @description 사용자 삭제 API 요청
 */
const onRemovePost = (selectedRows: IManageUser.UserInfo[], selectedRowKeys: string[]): void => {
  console.log(selectedRows, selectedRowKeys)
  modal.confirm({
    content: '선택한 사용자를 내보내시겠습니까?',
    icon: createVNode(QuestionCircleTwoTone),
    onOk() {
      // const params = {
      //   groupId: selectedRowKeys
      // }
      // console.log(selectedRowKeys)
      // ManagerUserService.removeUser(getWorkspace?.workspaceId, params).then(({ success }) => {
      //   if (success) {
      //     dynamicTableRef.value?.reload({ isReset: true })
      //     setTimeout(() => {
      //       message.success(t('common.message.deleteSuccess'), 1)
      //     }, 300)
      //   }
      // })
    }
    // async onCancel() {}
  })
}

const onCancelModal = (): void => {
  isVisible.value = false
  inviteMemberRef.value.onInitInviteEmails()
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
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
