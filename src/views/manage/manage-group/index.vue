<template>
  <div class="manage-group-container">
    <DynamicTable
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
            <PostDetail ref="postDetailRef" :data="selectedPost" :isEdit="isEdit" :mode="mode" />

            <a-tabs v-model:activeKey="activeKey">
              <a-tab-pane key="1" tab="상세보기">
                <GroupDetail
                  :data="selectedPost"
                  :groupId="selectedGroupId"
                  @onReload="fetchGroupUserList"
                />
              </a-tab-pane>

              <a-tab-pane key="2" tab="타임라인" force-render>
                <GroupHistory />
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </template>
    </DynamicTable>

    <Modal v-if="isVisible" @cancel="onCancelModal" @ok="createGroup" class="invite-modal">
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
import { computed, ref, watch } from 'vue'
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

const showDetail = ref(false)
const isLoading = ref(false)
const activeKey = ref('1')
const isVisible = ref(false)
const groupInfo = ref()

watch(
  () => groupInfo.value,
  (groupInfo) => {
    console.log(groupInfo)
  },
  {
    deep: true
  }
)

const { t } = useI18n()

const DEFAULT_MODE = modes.R
const mode = ref<ContentMode>(DEFAULT_MODE)
const isEdit = computed(() => mode.value === modes.C || mode.value === modes.U)

const { getWorkspace } = useWorkspaceStore()
const selectedPost = ref<IManageGroup.Content>()
const selectedGroupId = ref()

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

const fetchGroupUserList = (groupId) => {
  ManagerGroupService.getOneById(groupId).then(
    ({
      success,
      data: {
        posts: { content }
      }
    }) => {
      if (success) {
        selectedPost.value = content
        selectedGroupId.value = groupId

        console.log(selectedPost.value)
        showDetail.value = true
      }

      setTimeout(() => {
        isLoading.value = false
      }, 200)
    }
  )
}

const onClickRow = (row: IManageGroup.Content): void => {
  isLoading.value = true
  mode.value = DEFAULT_MODE
  console.log(row.groupId)

  fetchGroupUserList(row.groupId)
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
    message.success(t('common.message.saveSuccess'), 1)

    onCancelModal()
    // TODO modal 로딩스피너 넣기
  } catch (error) {
    console.log(error)
  }
}

const onCancelModal = (): void => {
  isVisible.value = false
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
