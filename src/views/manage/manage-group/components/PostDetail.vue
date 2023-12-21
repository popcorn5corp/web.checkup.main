<template>
  <div class="post-detail">
    <Form
      class="post-detail-read"
      v-if="!isEdit"
      :layout="formState.layout"
      :model="formState"
      v-bind="formItemLayout"
    >
      <div>
        <Item label="그룹명">{{ formState.post.name }}</Item>
        <Item label="게시물 내용">{{ formState.post.content }}</Item>
      </div>

      <a-dropdown v-model:open="visible">
        <a class="ant-dropdown-link" @click.prevent> <MoreOutlined /> </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">
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
      <Item label="게시물 제목" name="boardTitle">
        <Input v-model:value="formState.post.name" />
      </Item>
      <Item label="게시물 내용">
        <Input v-model:value="formState.post.boardContent" />
      </Item>
    </Form>

    <contextHolder />
  </div>
</template>
<style lang="scss" scoped>
.post-detail {
  :deep(.ant-form) {
    .ant-form-item-label {
      > label {
        font-weight: 500;
      }
    }

    .ant-form-item {
      padding: 0 1rem;
    }
  }
}
</style>

<script setup lang="ts" name="PostDetail">
import { IBaseSample } from '@/services'
import { Form, Input } from 'ant-design-vue'
import { Modal } from 'ant-design-vue'
import type { MenuProps } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { type UnwrapRef, computed, h, reactive, ref, watch } from 'vue'
import { ExclamationCircleOutlined, MoreOutlined } from '@/components/icons'
import { getDefaultPost } from '../constant'

const { Item } = Form
const [modal, contextHolder] = Modal.useModal()

type Post = IBaseSample.BaseSample
interface PostDetailProps {
  data: Post
  isEdit: boolean
  mode: ContentMode
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
  layout: 'horizontal',
  post: getDefaultPost(),
  clonePost: getDefaultPost()
})

const onSubmit = async () => formRef.value.validate()

const rollbackPost = () => (formState.post = cloneDeep(formState.clonePost))
const getPostDetail = (): Post => {
  const files = fileUploader.value.getFiles()

  return {
    ...formState.post,
    boardFiles: files
  }
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
    title: '사용자를 그룹에서 제거하시겠습니까?',
    icon: h(ExclamationCircleOutlined),
    okText: '삭제',
    okType: 'danger',
    cancelText: '취소',
    onOk() {
      // console.log('OK')
      // loading.value = true
      // ManagerGroupService.removeUserWithGroup(props.groupId, uid)
      //   .then(({ success }) => {
      //     if (success) {
      //       reload()
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
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
</style>
