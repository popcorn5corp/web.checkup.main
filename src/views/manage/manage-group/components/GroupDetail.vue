<template>
  <div class="group-detail-container">
    <List :dataSource="defaultDataSource">
      <template #renderItem="{ item }">
        <ListItem @click="open = true" style="cursor: pointer">
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
            <a-dropdown v-model:open="item.visible">
              <a class="ant-dropdown-link" @click.prevent> <MoreOutlined /> </a>
              <template #overlay>
                <a-menu @click="handleMenuClick(item.uid)">
                  <a-menu-item key="1">
                    <div style="display: flex; gap: 10px">
                      <MinusOutlined />
                      <span>그룹에서 제거</span>
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
    v-model:open="open"
    title="그룹에 사용자 추가"
    ok-text="확인"
    cancel-text="취소"
    :destroyOnClose="true"
    @ok="onSubmit"
  >
    <SearchSelect
      width="100%"
      v-model="selectedValues"
      :options="options"
      placeholder="사용자의 이름을 입력해주세요."
    >
      <template #statusDisabledText>이미 가입함</template>
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
import type { MenuProps } from 'ant-design-vue'
import { Modal } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { h, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { List, ListItem, ListItemMeta } from '@/components/list'
import { SearchSelect } from '@/components/search-select'

const { t } = useI18n()

type Props = { groupId: string }

const props = defineProps<Props>()

const options = ref([])
const loading = ref(false)
const open = ref(false)

const dataSource = ref([])
const selectedValues = ref()
const defaultDataSource = ref([{ name: '그룹에 사용자 추가' }])

const { getWorkspace } = useWorkspaceStore()

const [modal, contextHolder] = Modal.useModal()

function fetchGroupUserList() {
  loading.value = true

  ManagerGroupService.getGroupDetail(props.groupId)
    .then(
      ({
        success,
        data: {
          posts: { content }
        }
      }) => {
        if (success) {
          dataSource.value = content
        }
      }
    )
    .catch((error) => console.log(error))

  setTimeout(() => (loading.value = false), 300)
}

watch(
  props,
  (groupId) => {
    console.log('groupId >>> ', groupId)

    fetchGroupUserList()
    getWorkspaceUserList()
  },
  { immediate: true }
)

watch(selectedValues.value, () => {
  options.value = []
  loading.value = false
})

async function getWorkspaceUserList() {
  options.value = []
  await ManagerGroupService.getWorkspaceUserList(getWorkspace.workspaceId, props.groupId, {
    searchWord: ''
  })
    .then(
      ({
        success,
        data: {
          posts: { content }
        }
      }) => {
        console.log(success)
        if (success) {
          options.value = content.map((item: any) => ({
            label: item.nickname,
            value: item.nickname,
            description: item.email,
            prefixImg: item.thumbnail?.url,
            uid: item.uid,
            disabled: item.status.value === 'JOINED'
          }))
        }
      }
    )
    .catch((error) => {
      console.log(error)
    })
}

function reload() {
  loading.value = true

  fetchGroupUserList()

  loading.value = false
}
const onSubmit = () => {
  ManagerGroupService.addUserWithGroup(props.groupId, {
    workspaceId: getWorkspace.workspaceId,
    addUsers: selectedValues.value.map((item: any) => ({
      uid: item.uid,
      nickname: item.label
    }))
  })
    .then(({ success }) => {
      if (success) {
        open.value = false

        reload()

        message.success(t('common.message.saveSuccess'), 1)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const showDeleteConfirm = (uid: string) => {
  modal.confirm({
    title: '사용자를 그룹에서 내보내시겠습니까?',
    icon: h(ExclamationCircleOutlined),
    okText: '확인',
    okType: 'primary',
    cancelText: '취소',
    onOk() {
      console.log('OK')
      loading.value = true

      ManagerGroupService.removeUserWithGroup(props.groupId, uid)
        .then(({ success }) => {
          if (success) {
            reload()

            message.success(t('common.message.deleteSuccess'), 1)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    onCancel() {
      console.log('Cancel')
    }
  })
}

const handleMenuClick: MenuProps['onClick'] = (uid: any) => {
  showDeleteConfirm(uid)
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
