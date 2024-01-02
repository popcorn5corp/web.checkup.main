<template>
  <div class="post-detail">
    <Form
      v-if="!isEdit"
      :layout="formState.layout"
      :model="formState"
      v-bind="formItemLayout"
      class="form-wrapper"
    >
      <div class="img-wrapper">
        <img :src="formState.data.thumbnail?.url" />
      </div>
      <div class="form-item-wrapper">
        <Item :label="$t('common.name')" name="nickname">
          {{ formState.data.nickname }}
        </Item>
        <Item :label="$t('common.status')" name="userStatus">
          {{ formState.data.userStatus.label }}
        </Item>
        <Item :label="$t('common.email')" name="email">
          {{ formState.data.email }}
        </Item>
        <Item :label="$t('common.phone')" name="phone">
          {{ formState.data.phone }}
        </Item>
        <Item :label="$t('page.manage.joinDate')" name="joinDate">
          {{ formState.data.joinDate }}
        </Item>
      </div>

      <a-dropdown v-model:open="visible" :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent><MoreOutlined /></a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="onEditMode">
              <span>{{ t('common.postModify') }}</span>
            </a-menu-item>
            <a-menu-item key="2" @click="handleMenuClick">
              <span>{{ t('page.manage.export') }}</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </Form>

    <Form
      v-else
      ref="formRef"
      :layout="formState.layout"
      :model="formState"
      v-bind="formItemLayout"
    >
      <Item :label="$t('common.name')" name="nickname">
        <Input v-model:value="formState.data.nickname" />
      </Item>
      <Item :label="$t('common.status')">
        <Select
          v-model:value="formState.data.userStatus.label"
          :options="userStatusOptions"
        ></Select>
      </Item>
      <Item :label="$t('common.email')" name="email">
        <Input v-model:value="formState.data.email" />
      </Item>
      <Item :label="$t('common.phone')" name="phone">
        <Input v-model:value="formState.data.phone" />
      </Item>
      <Item :label="$t('page.manage.joinDate')" name="joinDate">
        {{ formState.data.joinDate }}
      </Item>
      <div class="btn-wrapper">
        <Button @click="initState"><CloseOutlined /></Button>
        <Button @click="onSubmit" type="primary"><CheckOutlined /></Button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="tsx" name="PostDetail">
import { Form, Input, type MenuProps, Modal, Select, type SelectProps } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { type UnwrapRef, computed, h, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IManageUser } from '@/services/manage-users/interface'
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  MoreOutlined
} from '@/components/icons'
import { contentModes as modes } from '@/constants/content'
import { getDefaultPost } from '../constant'

const DEFAULT_MODE = modes.R

type WorkspaceUsers = IManageUser.UserListRequest
interface PostDetailProps {
  data: WorkspaceUsers
}

interface FormState {
  layout: 'horizontal' | 'vertical' | 'inline'
  data: WorkspaceUsers
  cloneData: WorkspaceUsers
}

const { t } = useI18n()
const { Item } = Form
const [modal, contextHolder] = Modal.useModal()

const props = defineProps<PostDetailProps>()

const formItemLayout = computed(() => {
  const { layout } = formState
  return layout === 'horizontal'
    ? {
        labelCol: { span: 7 },
        wrapperCol: { span: 16 }
      }
    : {}
})
const isEdit = computed(() => mode.value === modes.C || mode.value === modes.U)

const userStatusOptions = ref<SelectProps['options']>([
  {
    label: '활성',
    value: 'ACTIVE'
  },
  {
    label: '비활성',
    value: 'INACTIVE'
  },
  {
    label: '탈퇴',
    value: 'WITHDRAWN'
  },
  {
    label: '퇴출',
    value: 'REVOKE'
  }
])
const mode = ref<ContentMode>(DEFAULT_MODE)
const visible = ref(false)
const formRef = ref()
const fileUploader = ref()
const formState: UnwrapRef<FormState> = reactive({
  layout: 'horizontal',
  data: getDefaultPost(),
  cloneData: getDefaultPost()
})

const rollbackPost = () => (formState.data = cloneDeep(formState.cloneData))
const getPostDetail = (): WorkspaceUsers => {
  const files = fileUploader.value.getFiles()

  return {
    ...formState.data,
    boardFiles: files
  }
}

const onSubmit = async () => {
  // const requestBody = {
  //   workspaceId: getWorkspace?.workspaceId,
  //   name: formState.clonePost.name,
  //   content: formState.clonePost.content
  // }
  // ManagerUserService.updateGroup(props.data.groupId, requestBody)
  //   .then(({ success }) => {
  //     if (success) {
  //       message.success(t('common.message.saveSuccess'), 1)
  //       initState()
  //       emit('reload')
  //       formState.post = {
  //         ...formState.post,
  //         name: formState.clonePost.name,
  //         content: formState.clonePost.content
  //       }
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
}

const onEditMode = () => {
  mode.value = modes.C
}

const handleMenuClick: MenuProps['onClick'] = (uid: string) => {
  console.log('uid', uid)
  showDeleteConfirm(uid)
}

const showDeleteConfirm = (uid: string) => {
  modal.confirm({
    title: t('common.message.modalDeleteCheck'),
    icon: h(ExclamationCircleOutlined),
    okText: t('component.button.ok'),
    okType: 'primary',
    cancelText: t('component.button.cancel')
    // onOk() {
    //   const params = {
    //     groupId: [props.data.groupId]
    //   }

    //   ManagerUserService.removeGroup(getWorkspace?.workspaceId, params)
    //     .then(({ success }) => {
    //       if (success) {
    //         emit('reload')
    //         emit('isDetail')

    //         message.success(t('common.message.deleteSuccess'), 1)
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },
    // onCancel() {
    //   console.log('Cancel')
    // }
  })
}

const initState = (): void => {
  mode.value = DEFAULT_MODE
  visible.value = false
}

watch(
  () => props.data,
  (post) => {
    formState.data = {
      ...post
    }
    formState.cloneData = cloneDeep(post)
  },
  {
    immediate: true
  }
)

defineExpose({
  getPostDetail,
  rollbackPost,
  onSubmit
})
</script>

<style lang="scss" scoped>
.post-detail {
  padding: 10px;
  position: relative;
  .form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .img-wrapper {
      flex: 0.5;
      > img {
        width: 180px;
        border: 1px solid $color-gray-5;
        border-radius: 10px;
      }
      .ant-form-item {
        padding: 0;
        margin-bottom: 12px;
      }
    }
    .form-item-wrapper {
      flex: 0.8;
    }
  }

  .btn-wrapper {
    justify-content: flex-end;
    display: flex;
    gap: 3px;
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
    .ant-form-item-label {
      text-align: left;
      > label {
        font-weight: 900;
      }
      > label::after {
        content: '';
        position: relative;
        margin-block: 0;
        margin-inline-start: 7px;
        margin-inline-end: 8px;
        width: 1.5px;
        height: 37%;
        background: #d1d1d1;
      }
    }

    .ant-form-item {
      padding: 0;
      margin-bottom: 10px;
      .ant-row {
        flex-wrap: nowrap;
      }
      .ant-form-item-control {
        width: 100%;
      }
      // .ant-form-item-control-input-content {
      //   white-space: nowrap;
      //   overflow: hidden;
      //   text-overflow: ellipsis;
      // }
    }
  }
}

@include xxl {
  .form-wrapper {
    flex-direction: row !important;
    align-items: center !important;
  }
}
</style>
