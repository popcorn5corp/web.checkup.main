<template>
  <div class="post-detail">
    <Form class="post-detail-read" v-if="!isEdit" :layout="formState.layout">
      <div>
        <Item label="그룹 제목">{{ formState.post.name ?? '-' }}</Item>

        <Item label="그룹 내용">{{ formState.post.content ?? '-' }}</Item>
      </div>

      <a-dropdown v-model:open="visible" :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent> <MoreOutlined /> </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="onEditMode">
              <div style="display: flex; gap: 10px">
                <span>수정</span>
              </div>
            </a-menu-item>
            <a-menu-item key="2" @click="handleMenuClick">
              <div style="display: flex; gap: 10px">
                <span>그룹 삭제</span>
              </div>
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
      <Item label="그룹 제목" name="boardTitle">
        <Input v-model:value="formState.clonePost.name" />
      </Item>
      <Item label="그룹 내용">
        <Input v-model:value="formState.clonePost.content" />
      </Item>

      <div class="btn-wrapper">
        <Button @click="initState"><CloseOutlined /></Button>
        <Button @click="onSubmit" type="primary"><CheckOutlined /></Button>
      </div>
    </Form>

    <contextHolder />
  </div>
</template>

<script setup lang="ts" name="PostDetail">
import { IBaseSample } from '@/services'
import { ManagerGroupService } from '@/services'
import { Form, Input } from 'ant-design-vue'
import { Modal } from 'ant-design-vue'
import type { MenuProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { type UnwrapRef, computed, h, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
  ReloadOutlined
} from '@/components/icons'
import { contentModes as modes } from '@/constants/content'
import { getDefaultPost } from '../constant'

const DEFAULT_MODE = modes.R
const mode = ref<ContentMode>(DEFAULT_MODE)
const isEdit = computed(() => mode.value === modes.C || mode.value === modes.U)

const { Item } = Form
const [modal, contextHolder] = Modal.useModal()
const { t } = useI18n()
const emit = defineEmits(['reload', 'isDetail'])

const { getWorkspace } = useWorkspaceStore()
type Post = IBaseSample.BaseSample
interface PostDetailProps {
  data: Post
}

interface FormState {
  layout: 'horizontal' | 'vertical' | 'inline'
  post: Post
  clonePost: Post
}

const props = withDefaults(defineProps<PostDetailProps>(), {
  isEdit: false
})

const visible = ref(false)
const formRef = ref()
const fileUploader = ref()
const formState: UnwrapRef<FormState> = reactive({
  layout: 'vertical',
  post: getDefaultPost(),
  clonePost: getDefaultPost()
})

const onSubmit = async () => {
  const requestBody = {
    workspaceId: getWorkspace?.workspaceId,
    name: formState.clonePost.name,
    content: formState.clonePost.content
  }

  ManagerGroupService.updateGroup(props.data.groupId, requestBody)
    .then(({ success }) => {
      if (success) {
        message.success(t('common.message.saveSuccess'), 1)

        initState()

        emit('reload')

        formState.post = {
          ...formState.post,
          name: formState.clonePost.name,
          content: formState.clonePost.content
        }
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const rollbackPost = () => (formState.post = cloneDeep(formState.clonePost))
const getPostDetail = (): Post => {
  const files = fileUploader.value.getFiles()

  return {
    ...formState.post,
    boardFiles: files
  }
}

const initState = (): void => {
  mode.value = DEFAULT_MODE

  visible.value = false
}

const onEditMode = () => {
  mode.value = modes.C
}

const formItemLayout = computed(() => {
  const { layout } = formState
  return layout === 'horizontal'
    ? {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      }
    : {}
})

watch(
  () => props.data,
  (post) => {
    formState.post = {
      ...post
    }
    formState.clonePost = cloneDeep(post)
  },
  {
    immediate: true
  }
)

const showDeleteConfirm = (uid: string) => {
  modal.confirm({
    title: '그룹을 삭제하시겠습니까?',
    icon: h(ExclamationCircleOutlined),
    okText: '확인',
    okType: 'primary',
    cancelText: '취소',
    onOk() {
      const params = {
        groupId: [props.data.groupId]
      }

      ManagerGroupService.removeGroup(getWorkspace?.workspaceId, params)
        .then(({ success }) => {
          if (success) {
            emit('reload')
            emit('isDetail')

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

defineExpose({
  getPostDetail,
  rollbackPost,
  onSubmit
})
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

    .ant-form-item-label {
      > label {
        font-weight: 500;
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

    .ant-form-item {
      margin-bottom: 12px !important;
    }

    .ant-dropdown-link {
      position: absolute;
      top: 15px;
    }
  }
}
</style>
