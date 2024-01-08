<template>
  <div class="manage-group-container">
    <DynamicTable
      ref="dynamicTableRef"
      v-model:openDetail="showDetail"
      :row-key="'groupId'"
      :columns="columns()"
      :data-request="getDataSource"
      :column-request="getColumns"
      :filter-request="getFilters"
      :data-callback="dataCallback"
      :showRegist="false"
      :phText="$t('page.manage.ph.groupSearchPh')"
      @row-click="onClickRow"
      @row-delete="onRemovePost"
    >
      <template #tableBtns>
        <Button :label="t('common.registration')" size="middle" @click="handleShowModal">
          <template #icon>
            <PlusCircleTwoTone />
          </template>
        </Button>
      </template>

      <template #detail-title>
        <span> {{ t('common.postRead') }} </span>
      </template>

      <template #detail-content>
        <div class="detail-contents">
          <div class="tab-wrapper">
            <PostDetail
              :data="selectedData"
              @reload="tableReload"
              @close="handleShowDetail(false)"
            />

            <a-tabs
              v-model:active-key="tabActiveKey"
              :destroyInactiveTabPane="true"
              :tabBarGutter="70"
              :tabBarStyle="{ padding: '0 10%', display: 'flex' }"
            >
              <a-tab-pane v-for="(tab, index) in tabInfo" :key="tab.key" :tab="tab.title">
                <component :is="tab.component" :groupId="selectedData.groupId" />
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </template>
    </DynamicTable>

    <Modal
      v-if="showModal"
      :title="t('page.manage.addUserToAGroup')"
      :okBtnText="t('component.button.save')"
      :cancelBtnText="t('component.button.cancel')"
      @cancel="handleShowModal"
      @ok="createGroup"
      class="invite-modal"
    >
      <template #body>
        <GroupModalForm ref="modalRef" v-model="groupInfo" />
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts" name="ManageGroup">
import { ManagerGroupService } from '@/services'
import { message } from 'ant-design-vue'
import { Modal as modal } from 'ant-design-vue'
import { createVNode, defineAsyncComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IManageGroup } from '@/services/manage-group/interface'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { DynamicTable } from '@/components/dynamic-table'
import { PlusCircleTwoTone } from '@/components/icons'
import { QuestionCircleTwoTone } from '@/components/icons'
import { Modal } from '@/components/modal'
import GroupModalForm from './components/GroupModalForm.vue'
import PostDetail from './components/PostDetail.vue'
import { columns } from './mock'

const dynamicTableRef = ref<InstanceType<typeof DynamicTable>>()

const { t } = useI18n()

const tabInfo = {
  Detail: {
    key: 'Detail',
    title: t('page.manage.detail'),
    component: defineAsyncComponent(() => import('./components/GroupDetail.vue'))
  },
  History: {
    key: 'History',
    title: t('page.manage.history'),
    component: defineAsyncComponent(() => import('./components/GroupTimeline.vue'))
  }
}

const showDetail = ref(false)
const tabActiveKey = ref(tabInfo.Detail.key)
const showModal = ref(false)
const groupInfo = ref<IManageGroup.DefaultGroupInfo>()
const selectedData = ref()
const modalRef = ref()
const { getWorkspaceId } = useWorkspaceStore()

const handleShowDetail = (val: boolean) => {
  showDetail.value = val
}

const handleShowModal = (): void => {
  showModal.value = !showModal.value
}

const initTabKey = () => {
  tabActiveKey.value = tabInfo.Detail.key
}

/**
 * 다이나믹 테이블 기본세팅
 */
const getDataSource = async (param: IManageGroup.GroupListParam) => {
  return await ManagerGroupService.getGroupList(getWorkspaceId, param)
}
const dataCallback = ({ posts }: IManageGroup.ResponseTable['data']) => posts
const getFilters = () => ManagerGroupService.getPageInfo()
const getColumns = () => ManagerGroupService.getSortableCodes()

const tableReload = () => {
  dynamicTableRef.value?.reload({ isReset: true })
}

const MessageType = {
  Save: 'Save',
  Delete: 'Delete'
}

const showMessage = (type: string) => {
  if (type === MessageType.Save) {
    return message.success(t('common.message.saveSuccess'), 1)
  } else if (type === MessageType.Delete) {
    return message.success(t('common.message.deleteSuccess'), 1)
  }
}

const onClickRow = (row: IManageGroup.ResTableContent): void => {
  selectedData.value = row

  handleShowDetail(true)

  initTabKey()
}

/**
 * @description 그룹 등록 API 요청
 */
const createGroup = async () => {
  try {
    const groupInfo = modalRef.value?.getModalInfo

    const requestBody = {
      ...groupInfo,
      workspaceId: getWorkspaceId,
      addUsers: groupInfo.addUsers.map((item: any) => ({
        workspaceUserId: item.workspaceUserId,
        nickname: item.label
      }))
    }

    await ManagerGroupService.createGroup(requestBody)
      .then(({ success }) => {
        if (success) {
          showMessage(MessageType.Save)

          tableReload()

          handleShowModal()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.log(error)
  }
}

/**
 * @description 그룹 삭제 API 요청
 * @param selectedRows
 */
const onRemovePost = (
  selectedRows: IManageGroup.ResTableContent,
  selectedRowKeys: string[]
): void => {
  modal.confirm({
    content: t('common.message.modalDeleteCheck'),
    icon: createVNode(QuestionCircleTwoTone),
    onOk() {
      const params = {
        groupId: selectedRowKeys
      }

      ManagerGroupService.removeGroup(getWorkspaceId, params)
        .then(({ success }) => {
          if (success) {
            tableReload()

            setTimeout(() => {
              showMessage(MessageType.Delete)
            }, 300)
          }
        })
        .catch((error) => console.log(error))
    }
  })
}
</script>

<style lang="scss" scoped>
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
