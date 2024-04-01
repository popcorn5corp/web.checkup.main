<template>
  <div class="post-detail">
    <Form
      v-if="!isEdit"
      layout="horizontal"
      :model="formState"
      v-bind="formItemLayout"
      class="form-wrapper"
    >
      <div class="img-wrapper">
        <img :src="formState.data.detail.thumbnail?.url" />
      </div>
      <div class="form-item-wrapper">
        <FormItem :label="$t('common.name')" name="nickname">
          {{ formState.data.detail.nickname }}
        </FormItem>
        <FormItem :label="$t('common.status')" name="userStatus">
          {{ formState.data.detail.userStatus.label }}
        </FormItem>
        <FormItem :label="$t('common.email')" name="email">
          {{ formState.data.detail.email }}
        </FormItem>
        <FormItem :label="$t('common.phone')" name="phone">
          {{ formState.data.detail.phone || '-' }}
        </FormItem>
        <FormItem :label="$t('common.joinDate')" name="joinDate">
          {{ formState.data.detail.joinDate }}
        </FormItem>
        <FormItem label="그룹" class="group">
          <UserGroupDetail :userGroupData="formState.data.groups" />
        </FormItem>
      </div>

      <Dropdown v-model:open="visible" :trigger="['click']" placement="bottomRight">
        <a class="ant-dropdown-link" @click.prevent><MoreOutlined style="font-size: 20px" /></a>
        <template #overlay>
          <Menu>
            <MenuItem key="1" @click="onEditMode">
              <!-- 수정 -->
              <span class="item edit"><FormOutlined />{{ $t('component.button.edit') }}</span>
            </MenuItem>
            <MenuItem key="2" @click="showDeleteConfirm">
              <!-- 삭제 -->
              <span class="item delete"><DeleteOutlined />{{ $t('component.button.delete') }}</span>
            </MenuItem>
          </Menu>
        </template>
      </Dropdown>
    </Form>

    <Form v-else ref="formRef" layout="horizontal" class="edit-mode" :model="formState">
      <FormItem name="nickname" :label="$t('common.name')">
        <Input v-model:value="formState.cloneData.detail.nickname" disabled />
      </FormItem>
      <FormItem :label="$t('common.status')">
        <Select
          v-model:value="formState.cloneData.detail.userStatus"
          :options="userStatusOptions"
          @select="onStatusSelect"
        ></Select>
      </FormItem>
      <FormItem name="email" :label="$t('common.email')">
        <Input v-model:value="formState.cloneData.detail.email" disabled />
      </FormItem>
      <FormItem name="phone" :label="$t('common.phone')">
        <Input v-model:value="formState.cloneData.detail.phone" disabled />
      </FormItem>
      <FormItem name="joinDate" :label="$t('common.joinDate')">
        <Input v-model:value="formState.cloneData.detail.joinDate" disabled />
      </FormItem>
      <div class="btn-wrapper">
        <Button @click="initState"><CloseOutlined /></Button>
        <Button @click="onSubmit" type="primary"><CheckOutlined /></Button>
      </div>
    </Form>

    <contextHolder />
  </div>
</template>

<script setup lang="tsx" name="PostDetail">
import { ManageUserService } from '@/services'
import { Dropdown, Menu, MenuItem, Modal, Select, type SelectProps, message } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { type UnwrapRef, computed, h, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import type { IManageUser } from '@/services/manage-users/types'

import { Button } from '@/components/button'
import { Form, FormItem } from '@/components/form'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  MoreOutlined
} from '@/components/icons'
import { Input } from '@/components/input'

import { contentModes as modes } from '@/constants/content'

import { getDefaultPost } from '../constant'
import UserGroupDetail from './UserGroupDetail.vue'

const DEFAULT_MODE = modes.R

type WorkspaceUsers = IManageUser.GetDetailResponse
interface PostDetailProps {
  workspaceId: string
  workspaceUserId: string
}

interface FormState {
  data: WorkspaceUsers
  cloneData: WorkspaceUsers
}

const MessageType = {
  Delete: 'Delete',
  Active: 'Active',
  Inactive: 'Inactive'
}

const { t } = useI18n()
const [modal, contextHolder] = Modal.useModal()

const props = defineProps<PostDetailProps>()
const emit = defineEmits(['reload', 'close'])

const isEdit = computed(() => mode.value === modes.C || mode.value === modes.U)

const userStatusOptions = ref<SelectProps['options']>([
  {
    label: '활성',
    value: 'ACTIVE'
  },
  {
    label: '비활성',
    value: 'INACTIVE'
  }
])
const mode = ref<ContentMode>(DEFAULT_MODE)
const visible = ref(false)
const formRef = ref()
const formState: UnwrapRef<FormState> = reactive({
  data: getDefaultPost(),
  cloneData: getDefaultPost()
})

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

const initState = (): void => {
  mode.value = DEFAULT_MODE
  visible.value = false
  formState.data = formState.cloneData
}

const onEditMode = () => {
  mode.value = modes.C
}

const showMessage = (type: string) => {
  if (type === MessageType.Delete) {
    return message.success(t('message.deleteSuccess'), 1)
  } else if (type === MessageType.Active) {
    return message.success(t('message.userActive', { user: formState.data.detail.nickname }), 1)
  } else if (type === MessageType.Inactive) {
    return message.success(t('message.userInactive', { user: formState.data.detail.nickname }), 1)
  }
}

const onStatusSelect = (value: any) => {
  if (value === 'INACTIVE') {
    modal.confirm({
      title: t('message.userStatusInfo'),
      icon: h(ExclamationCircleOutlined),
      // okCancel: false
      onCancel() {
        formState.cloneData.detail.userStatus = {
          label: '활성',
          value: 'ACTIVE'
        }
      }
    })
  }
}

const deleteUser = () => {
  const { workspaceId, workspaceUserId } = props
  ManageUserService.removeUser(workspaceId, workspaceUserId)
    .then(({ success }) => {
      if (success) {
        emit('reload')
        emit('close')

        showMessage(MessageType.Delete)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const showDeleteConfirm = () => {
  modal.confirm({
    title: <pre>{t('message.modalUserDeleteCheck')}</pre>,
    icon: h(ExclamationCircleOutlined),
    onOk() {
      deleteUser()
    }
  })
}

const onSubmit = async () => {
  const { workspaceId, workspaceUserId } = props
  const requestBody = {
    userStatus: formState.cloneData.detail.userStatus.value
  }
  console.log('req', requestBody)
  ManageUserService.updateUser(workspaceId, workspaceUserId, requestBody)
    .then(({ success }) => {
      if (success) {
        initState()

        emit('reload')

        formState.data.detail = {
          ...formState.cloneData.detail,
          userStatus: formState.cloneData.detail.userStatus
        }

        if (formState.cloneData.detail.userStatus.value === 'ACTIVE') {
          showMessage(MessageType.Active)
        } else {
          showMessage(MessageType.Inactive)
        }
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const fetchUserDetail = async (workspaceId: string, workspaceUserId: string) => {
  await ManageUserService.getOneById(workspaceId, workspaceUserId).then(({ success, data }) => {
    if (success) {
      formState.data = {
        ...data
      }
      formState.cloneData = cloneDeep(data)
    }
  })
}

watch(
  () => props,
  (props) => {
    fetchUserDetail(props.workspaceId, props.workspaceUserId)
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
.post-detail {
  position: relative;
  .form-wrapper {
    display: flex;
    flex-direction: column;

    .img-wrapper {
      padding-left: 1rem;
      margin-bottom: 1rem;
      > img {
        width: 180px;
        border: 1px solid $color-gray-5;
        border-radius: 10px;
      }
    }
    .form-item-wrapper {
      width: 100%;
      align-self: flex-start;
      padding-left: 1rem;
    }
    .form-item-wrapper.group {
      :deep(.ant-form-item-control-input-content) {
        border: 1px solid $input-border-color;
        border-radius: 6px;
        padding: 10px;
        padding-right: 0;
      }
    }
  }

  .btn-wrapper {
    justify-content: flex-end;
    display: flex;
    gap: 3px;
    margin-top: 10px;

    .ant-btn {
      padding: 2px 9px;

      span {
        font-size: 10px;
      }
    }
  }

  .ant-dropdown-link {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  :deep(.ant-form) {
    gap: 1rem;
    padding: 10px;
    .ant-form-item {
      padding: 0;
      .ant-form-item-control {
        width: 100%;
      }
      .ant-form-item-control-input {
        word-break: break-all;
      }
    }
  }
  .edit-mode {
    padding: 10px 40px;
  }
}

.item {
  .anticon {
    margin-right: 5px;
  }
}
.item.edit {
  .anticon {
    color: $color-blue-6;
  }
}
.item.delete {
  .anticon {
    color: $color-red-6;
  }
}
</style>
