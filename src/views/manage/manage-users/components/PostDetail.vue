<template>
  <div class="post-detail">
    <Form v-if="!isEdit" layout="horizontal" :model="formState" class="form-wrapper">
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
          {{ formState.data.phone || '-' }}
        </Item>
        <Item :label="$t('common.joinDate')" name="joinDate">
          {{ formState.data.joinDate }}
        </Item>
      </div>

      <a-dropdown v-model:open="visible" :trigger="['click']" placement="bottomRight">
        <a class="ant-dropdown-link" @click.prevent><MoreOutlined style="font-size: 18px" /></a>
        <template #overlay>
          <a-menu style="width: fit-content">
            <a-menu-item key="1" @click="onEditMode">
              <span>{{ t('common.postModify') }}</span>
            </a-menu-item>
            <a-menu-item key="2" @click="showDeleteConfirm">
              <span>{{ t('component.button.export') }}</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </Form>

    <Form v-else ref="formRef" layout="horizontal" :model="formState">
      <Item name="nickname">
        <Input v-model:value="formState.data.nickname" :label="$t('common.name')" />
      </Item>
      <Item>
        <Select
          v-model:value="formState.data.userStatus"
          :options="userStatusOptions"
          :label="$t('common.status')"
        ></Select>
      </Item>
      <Item name="email">
        <Input v-model:value="formState.data.email" :label="$t('common.email')" />
      </Item>
      <Item name="phone">
        <Input v-model:value="formState.data.phone" :label="$t('common.phone')" />
      </Item>
      <Item name="joinDate">
        <Input v-model:value="formState.data.joinDate" :label="$t('common.joinDate')" disabled />
      </Item>
      <div class="btn-wrapper">
        <Button @click="initState"><CloseOutlined /></Button>
        <Button @click="onSubmit" type="primary"><CheckOutlined /></Button>
      </div>
    </Form>

    <contextHolder />
  </div>
</template>

<script setup lang="tsx" name="PostDetail">
import { Form, Modal, type SelectProps } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { type UnwrapRef, computed, h, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IManageUser } from '@/services/manage-users/types'
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  MoreOutlined
} from '@/components/icons'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { contentModes as modes } from '@/constants/content'
import { getDefaultPost } from '../constant'

const DEFAULT_MODE = modes.R

type WorkspaceUsers = IManageUser.UserInfo
interface PostDetailProps {
  data: WorkspaceUsers
}

interface FormState {
  data: WorkspaceUsers
  cloneData: WorkspaceUsers
}

const { t } = useI18n()
const { Item } = Form
const [modal, contextHolder] = Modal.useModal()

const props = defineProps<PostDetailProps>()

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
const formState: UnwrapRef<FormState> = reactive({
  data: getDefaultPost(),
  cloneData: getDefaultPost()
})

const onSubmit = async () => {
  console.log('click onSubmit')
  // const requestBody = {
  //   workspaceId: getWorkspace?.workspaceId,
  //   name: formState.clonePost.name,
  //   content: formState.clonePost.content
  // }
  // ManagerUserService.updateGroup(props.data.groupId, requestBody)
  //   .then(({ success }) => {
  //     if (success) {
  //       message.success(t('message.saveSuccess'), 1)
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

const showDeleteConfirm = () => {
  modal.confirm({
    title: t('message.modalDeleteCheck'),
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

    //         message.success(t('message.deleteSuccess'), 1)
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
  formState.data = formState.cloneData
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
</script>

<style lang="scss" scoped>
.post-detail {
  padding: 10px;
  position: relative;
  .form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    .img-wrapper {
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
    .ant-form-item-label {
      width: 55px;
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
      margin-bottom: 0;
      .ant-row {
        flex-wrap: nowrap;
      }
      .ant-form-item-control {
        width: 100%;
      }
      .ant-form-item-control-input {
        word-break: break-all;
      }
    }
  }
}
</style>
