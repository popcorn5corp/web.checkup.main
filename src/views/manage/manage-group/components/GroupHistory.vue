<template>
  <div class="group-history-container">
    <a-timeline pending="잠시만 기다려주세요...">
      <template v-for="item in 2">
        asdf
        <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
        <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
        <a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
      </template>
    </a-timeline>
    <a-button type="primary" style="margin-top: 16px" @click="handleClick">Toggle Reverse</a-button>
  </div>
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

const reverse = ref<boolean>(false)

const handleClick = () => {}

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
.group-history-container {
  padding: 1rem 1.6rem;
}
</style>
