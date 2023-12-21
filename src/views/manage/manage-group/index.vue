<template>
  <div class="manage-group-container">
    <DynamicTable
      ref="dynamicTableRef"
      v-model:openDetail="showDetail"
      rowKey="key"
      :columns="columns"
      :data-request="getDataSource"
      :column-request="getColumns"
      :filter-request="getFilters"
      :data-callback="dataCallback"
      :content-callback="contentCallback"
      :showRegist="false"
      @row-click="onClickRow"
      @row-add="onClickInvite"
    >
      <template #tableBtns>
        <Button :label="'등록하기'" size="middle" @click="$emit('row-add', (isVisible = true))">
          <template #icon>
            <PlusCircleTwoTone />
          </template>
        </Button>
      </template>

      <template #detail-title>
        <span> 게시물 상세 </span>
      </template>

      <template #detail-content>
        <div class="detail-contents">
          <div class="tab-wrapper">
            <PostDetail :data="selectedData" :isEdit="isEdit" :mode="mode" />

            <a-tabs v-model:active-key="activeKey" :destroyInactiveTabPane="true">
              <a-tab-pane v-for="(tab, index) in tabInfo" :key="tab.key" :tab="tab.title">
                <component :is="tab.component" :groupId="selectedData.groupId" />
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </template>
    </DynamicTable>

    <Modal
      v-if="isVisible"
      ok-text="확인"
      cancel-text="취소"
      @cancel="onCancelModal"
      @ok="createGroup"
      class="invite-modal"
    >
      <template #title>사용자 그룹 등록</template>
      <template #body>
        <GroupModalForm v-model="groupInfo" />
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts" name="ManageGroup">
import { ManagerGroupService } from '@/services'
import { message } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IManageGroup } from '@/services/manage-group/interface'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { DynamicTable } from '@/components/dynamic-table'
import { PlusCircleTwoTone } from '@/components/icons'
import { Modal } from '@/components/modal'
import { contentModes as modes } from '@/constants/content'
import GroupDetail from './components/GroupDetail.vue'
import GroupHistory from './components/GroupHistory.vue'
import GroupModalForm from './components/GroupModalForm.vue'
import PostDetail from './components/PostDetail.vue'
import { columns } from './mock'

const dynamicTableRef = ref<InstanceType<typeof DynamicTable>>()
const tabInfo = {
  Detail: {
    key: 'Detail',
    title: '상세보기',
    component: GroupDetail
  },
  History: {
    key: 'History',
    title: '타임라인',
    component: GroupHistory
  }
}

const showDetail = ref(false)
const activeKey = ref(tabInfo.Detail.key)
const isVisible = ref(false)
const groupInfo = ref()
const selectedData = ref()

const { t } = useI18n()
const DEFAULT_MODE = modes.R
const mode = ref<ContentMode>(DEFAULT_MODE)
const isEdit = computed(() => mode.value === modes.C || mode.value === modes.U)

const { getWorkspace } = useWorkspaceStore()

const getDataSource = (param: IManageGroup.GroupListParam) => {
  return ManagerGroupService.getGroupList(getWorkspace.workspaceId, param)
}

const getFilters = () => {
  return ManagerGroupService.getPageInfo()
}

const getColumns = () => {
  return ManagerGroupService.getSortableCodes()
}

const dataCallback = (data: { posts: IManageGroup.GroupTableResponse['posts'] }) => {
  const { posts } = data
  return posts
}

const contentCallback = (content: IManageGroup.GroupTableResponse['posts']['content']) => {
  return content
}

const onClickRow = (row: IManageGroup.Content): void => {
  selectedData.value = row
  console.log(row)

  showDetail.value = true

  activeKey.value = tabInfo.Detail.key
}

/**
 * @description 그룹 등록 API 요청
 */
const createGroup = async () => {
  try {
    const requestBody = {
      workspaceId: getWorkspace.workspaceId,
      ...groupInfo.value,
      addUsers: groupInfo.value.addUsers.map((item: any) => ({
        uid: item.value,
        nickname: item.label
      }))
    }

    console.log(requestBody)

    await ManagerGroupService.createGroup(requestBody)
      .then(({ success }) => {
        if (success) {
          message.success(t('common.message.saveSuccess'), 1)
          onCancelModal()
          dynamicTableRef.value?.reload({ isReset: true })
        }
      })
      .catch((error) => {
        console.log(error)
      })

    // TODO modal 로딩스피너 넣기
  } catch (error) {
    console.log(error)
  }
}

const onCancelModal = (): void => {
  isVisible.value = false
}

const onClickInvite = (): void => {
  isVisible.value = true
  mode.value = modes.C
}
</script>

<style lang="scss" scoped>
:deep(.ant-tabs-nav-list) {
  width: 100%;
  .ant-tabs-tab {
    flex: 0.5;
    .ant-tabs-tab-btn {
      margin: 0 auto;
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
</style>
