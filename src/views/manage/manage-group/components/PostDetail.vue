<template>
  <div class="post-detail">
    <Form class="post-detail-read" v-if="!isEdit" layout="horizontal" v-bind="formItemLayout">
      <div>
        <FormItem :label="t('page.manage.groupTitle')">{{ formState.post?.name ?? '-' }}</FormItem>

        <FormItem :label="t('page.manage.groupContent')">
          {{ formState.post.content ?? '-' }}
        </FormItem>
      </div>

      <a-dropdown v-model:open="isDropdown" :trigger="['click']" placement="bottomRight">
        <a class="ant-dropdown-link" @click.prevent> <MoreOutlined style="font-size: 18px" /> </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="changeMode(modes.C)">
              <div style="display: flex; gap: 10px">
                <span>{{ t('common.postModify') }}</span>
              </div>
            </a-menu-item>
            <a-menu-item key="2" @click="showDeleteConfirm">
              <div style="display: flex; gap: 10px">
                <span>{{ t('component.button.delete') }}</span>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </Form>

    <Form v-else layout="horizontal" :model="formState">
      <FormItem :label="t('page.manage.groupTitle')">
        <Input v-model:value="formState.clonePost.name" />
      </FormItem>
      <FormItem :label="t('page.manage.groupContent')">
        <Input v-model:value="formState.clonePost.content" />
      </FormItem>

      <div class="btn-wrapper">
        <Button @click="initState"><CloseOutlined /></Button>
        <Button @click="onSubmit" type="primary"><CheckOutlined /></Button>
      </div>
    </Form>

    <!-- Modal Context -->
    <contextHolder />
  </div>
</template>

<script setup lang="ts" name="PostDetail">
import { ManageGroupService } from '@/services'
import { Modal, message } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { type UnwrapRef, computed, h, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { IManageGroup } from '@/services/manage-group/types'

import { useWorkspaceStore } from '@/stores/modules/workspace'

import { Form, FormItem } from '@/components/form'
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  MoreOutlined
} from '@/components/icons'
import { Input } from '@/components/input'

import { contentModes as modes } from '@/constants/content'

const { t } = useI18n()
type PostType = Pick<IManageGroup.TableDataSource, 'name' | 'content'>

interface PostDetailProps {
  data: PostType & { groupId: string }
}

interface FormState {
  post: PostType
  clonePost: PostType
}

const props = defineProps<PostDetailProps>()
const emit = defineEmits(['reload', 'close'])

const { getWorkspaceId } = useWorkspaceStore()
const [modal, contextHolder] = Modal.useModal()

const DEFAULT_MODE = modes.R
const mode = ref<ContentMode>(DEFAULT_MODE)
const isEdit = computed(() => mode.value === modes.C || mode.value === modes.U)
const isDropdown = ref(false)

const MessageType = {
  Save: 'Save',
  Delete: 'Delete'
}

const defaultFormState = {
  name: '',
  content: ''
}

const formState: UnwrapRef<FormState> = reactive({
  post: defaultFormState,
  clonePost: defaultFormState
})

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

;(() => {
  formState.post = {
    ...props.data,
    content: props.data.content.length ? props.data.content : ' - '
  }

  formState.clonePost = cloneDeep(props.data)
})()

const showMessage = (type: string) => {
  if (type === MessageType.Save) {
    return message.success(t('message.saveSuccess'), 1)
  } else if (type === MessageType.Delete) {
    return message.success(t('message.deleteSuccess'), 1)
  }
}

const handleDropdown = () => {
  isDropdown.value = !isDropdown.value
}

const changeMode = (modeType: ContentMode) => {
  mode.value = modeType
}

const onSubmit = async () => {
  const requestBody = {
    workspaceId: getWorkspaceId as string,
    name: formState.clonePost.name,
    content: formState.clonePost.content
  }

  ManageGroupService.updateGroup(props.data.groupId, requestBody)
    .then(({ success }) => {
      if (success) {
        initState()

        emit('reload')

        showMessage(MessageType.Save)

        formState.post = {
          ...formState.post,
          name: formState.clonePost?.name,
          content: formState.clonePost?.content
        }
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const initState = (): void => {
  changeMode(DEFAULT_MODE)

  handleDropdown()
}

const deleteGroup = () => {
  const params = {
    groupId: [props.data.groupId]
  }

  ManageGroupService.removeGroup(getWorkspaceId, params)
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
    title: t('message.modalDeleteCheck'),
    icon: h(ExclamationCircleOutlined),
    okText: t('component.button.ok'),
    okType: 'primary',
    cancelText: t('component.button.cancel'),
    onOk() {
      deleteGroup()
    }
  })
}
</script>

<style lang="scss" scoped>
.post-detail {
  position: relative;
}

.ant-dropdown-link {
  position: absolute;
  right: 1rem;
  top: 5px;
}
.post-detail {
  :deep(.ant-form) {
    padding: 16px 16px;

    // .ant-form-item-label {
    //   width: 70px;
    //   padding: 0;
    //   > label {
    //     font-weight: 900;
    //     font-size: 14px;
    //   }
    //   > label::after {
    //     content: '';
    //     position: relative;
    //     margin-block: 0;
    //     margin-inline-start: 7px;
    //     margin-inline-end: 8px;
    //     width: 1.5px;
    //     height: 37%;
    //     background: #d1d1d1;
    //   }
    // }

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

    .ant-form-item {
      padding: 0;
    }

    .ant-dropdown-link {
      position: absolute;
      top: 15px;
    }
  }
}
</style>
