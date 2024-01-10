<template>
  <div class="group-detail-container">
    <List :dataSource="defaultDataSource">
      <template #renderItem="{ item }">
        <ListItem @click="handleShowModal" style="cursor: pointer">
          <ListItemMeta>
            <template #avatar>
              <a-avatar style="color: #1890ff; background: #1890fa2b">
                <template #icon><UserAddOutlined /></template>
              </a-avatar>
            </template>

            <template #title>
              <a href="#">{{ item.name }}</a>
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>

    <List :dataSource="dataSource" :loading="loading">
      <template #renderItem="{ item }">
        <ListItem>
          <a-skeleton avatar :title="false" :loading="!!item.loading" active>
            <ListItemMeta :description="item.email">
              <template #avatar>
                <a-avatar :src="item.thumbnail?.url" />
              </template>

              <template #title>
                <a href="#">{{ item.nickname }}</a>
              </template>
            </ListItemMeta>
          </a-skeleton>

          <template #actions>
            <a-dropdown v-model:open="item.visible" :trigger="['click']">
              <a class="ant-dropdown-link" @click.prevent>
                <MoreOutlined style="font-size: 18px" />
              </a>
              <template #overlay>
                <a-menu @click="showDeleteConfirm(item.uid)">
                  <a-menu-item key="1">
                    <div style="display: flex; gap: 10px">
                      <MinusOutlined />
                      <span>{{ t('page.manage.removeUserToAGroup') }}</span>
                    </div>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </ListItem>
      </template>
    </List>
  </div>

  <contextHolder />

  <a-modal
    v-model:open="showModal"
    :title="t('page.manage.addUserToAGroup')"
    :ok-text="t('component.button.save')"
    :cancel-text="t('component.button.cancel')"
    :destroyOnClose="true"
    @ok="onSubmit"
  >
    <SearchSelect
      width="100%"
      v-model="selectedValues"
      :options="options"
      :placeholder="t('page.manage.typingUserName')"
    >
      <template #statusDisabledText>{{ t('page.manage.joined') }}</template>
    </SearchSelect>
  </a-modal>
</template>

<script setup lang="ts" name="ComponentsOverviewList">
import { ManagerGroupService } from '@/services'
import {
  ExclamationCircleOutlined,
  MinusOutlined,
  MoreOutlined,
  UserAddOutlined
} from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { h, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IManageGroup } from '@/services/manage-group/interface'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { List, ListItem, ListItemMeta } from '@/components/list'
import { SearchSelect } from '@/components/search-select'

const { t } = useI18n()

type Props = { groupId: string }

const props = defineProps<Props>()

const options = ref([])
const loading = ref(false)
const showModal = ref(false)

const dataSource = ref<IManageGroup.UserInfo[] | []>([])
const selectedValues = ref()
const defaultDataSource = ref([{ name: t('page.manage.addUserToAGroup') }])

const { getWorkspaceId } = useWorkspaceStore()

const [modal, contextHolder] = Modal.useModal()

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

const handleShowModal = () => {
  showModal.value = !showModal.value
}

const handleLoading = () => {
  loading.value = !loading.value
}

function fetchGroupUserList() {
  handleLoading()

  ManagerGroupService.getGroupDetail(props.groupId)
    .then(({ success, data }) => {
      if (success) {
        dataSource.value = data.posts.content
      }
    })
    .catch((error) => console.log(error))

  setTimeout(() => handleLoading(), 300)
}

watch(
  props,
  () => {
    fetchGroupUserList()
    getWorkspaceUserList()
  },
  { immediate: true }
)

watch(
  () => showModal.value,
  (showModal) => {
    if (showModal) {
      getWorkspaceUserList()
    }
  }
)

const getOptions = (content: any) => {
  return content.map((item: any) => ({
    label: item.nickname,
    value: item.nickname,
    description: item.email,
    prefixImg: item.thumbnail?.url,
    uid: item.uid,
    disabled: item.status.value === 'JOINED'
  }))
}

async function getWorkspaceUserList() {
  const param = {
    searchWord: ''
  }

  const {
    success,
    data: {
      posts: { content }
    }
  } = await ManagerGroupService.getWorkspaceUserList(getWorkspaceId, props.groupId, param)

  if (success) {
    options.value = getOptions(content)
  }
}

function reloadUserList() {
  handleLoading()

  fetchGroupUserList()

  handleLoading()
}

const onSubmit = () => {
  if (selectedValues.value) {
    ManagerGroupService.addUserWithGroup(props.groupId, {
      workspaceId: getWorkspaceId as string,
      addUsers: selectedValues.value.map((item: any) => ({
        uid: item.uid,
        nickname: item.label
      }))
    })
      .then(({ success }) => {
        if (success) {
          showMessage(MessageType.Save)

          reloadUserList()

          handleShowModal()
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const showDeleteConfirm = (uid: string) => {
  modal.confirm({
    title: t('page.manage.message.deleteUser'),
    icon: h(ExclamationCircleOutlined),
    okText: t('component.button.ok'),
    okType: 'primary',
    cancelText: t('component.button.cancel'),
    onOk() {
      ManagerGroupService.removeUserWithGroup(props.groupId, uid)
        .then(({ success }) => {
          if (success) {
            showMessage(MessageType.Delete)

            reloadUserList()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  })
}
</script>

<style lang="scss" scoped>
:deep(.ant-list-item-meta-title) {
  margin-bottom: 0 !important;
}

:deep(.list-item-wrapper) {
  &:hover {
    background: #188fff0d;
  }
}
</style>
