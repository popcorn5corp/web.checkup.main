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

    <List :dataSource="props.data" :loading="loading">
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
            <!-- <Badge theme="default" shape="squared">{{ item.status.value }}</Badge> -->

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
    ok-text="저장"
    cancel-text="취소"
    @ok="onSubmit"
  >
    <SearchSelect
      width="100%"
      v-model="selectedValues"
      :options="options"
      :filterOption="false"
      placeholder="사용자의 이름을 입력해주세요."
      @search="getWorkspaceUserList"
    ></SearchSelect>
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
import type { IManageGroup } from '@/services/manage-group/interface'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { List, ListItem, ListItemMeta } from '@/components/list'
import { SearchSelect } from '@/components/search-select'

type Post = IManageGroup.Content

const { t } = useI18n()
interface PostDetailProps {
  data: Post
  groupId: string
}
const props = defineProps<PostDetailProps>()
const emit = defineEmits(['onReload'])

const selectedValues = ref()
const options = ref([])
const loading = ref(true)
const open = ref(false)

const defaultDataSource = ref([{ name: '그룹에 사용자 추가' }])

const { getWorkspace } = useWorkspaceStore()

const [modal, contextHolder] = Modal.useModal()

watch(
  () => props.data,
  (data) => {
    loading.value = false

    console.log(data)
  },
  {
    immediate: true
  }
)

watch(selectedValues.value, () => {
  options.value = []
  loading.value = false
})

const getWorkspaceUserList = async (value: string) => {
  options.value = []
  const {
    data: {
      posts: { content }
    }
  } = await ManagerGroupService.getWorkspaceUserList(getWorkspace.workspaceId, props.groupId, {
    searchWord: value
  })

  options.value = content.map((item: Post) => ({
    label: item.nickname,
    value: item.uid,
    description: item.email,
    prefixImg: item.thumbnail?.url
  }))
}

const onSubmit = () => {
  ManagerGroupService.addUserWithGroup(props.groupId, {
    workspaceId: getWorkspace.workspaceId,
    addUsers: selectedValues.value.map((item: any) => ({
      uid: item.value,
      nickname: item.label
    }))
  })
    .then(({ success }) => {
      if (success) {
        loading.value = true
        message.success(t('common.message.saveSuccess'), 1)
        open.value = false

        emit('onReload', props.groupId)

        loading.value = false
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const showDeleteConfirm = (uid: string) => {
  modal.confirm({
    title: '사용자를 그룹에서 제거하시겠습니까?',
    icon: h(ExclamationCircleOutlined),
    okText: '삭제',
    okType: 'danger',
    cancelText: '취소',
    onOk() {
      console.log('OK')
      loading.value = true

      ManagerGroupService.removeUserWithGroup(props.groupId, uid)
        .then(({ success }) => {
          if (success) {
            loading.value = true
            message.success(t('common.message.saveSuccess'), 1)

            emit('onReload', props.groupId)

            loading.value = false
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

const handleMenuClick: MenuProps['onClick'] = (uid) => {
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
