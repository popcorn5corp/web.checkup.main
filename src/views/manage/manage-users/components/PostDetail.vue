<template>
  <div class="post-detail">
    <Form v-if="!isEdit" :layout="formState.layout" :model="formState" v-bind="formItemLayout">
      <!-- TODO temp -->
      <Item label="이름" name="nickname">
        {{ formState.data.nickname }}
      </Item>
      <Item label="이메일" name="email">
        {{ formState.data.email }}
      </Item>
      <Item label="핸드폰" name="phone">
        {{ formState.data.phone }}
      </Item>
      <Item label="가입일" name="joinedAt">
        {{ formState.data.joinedAt }}
      </Item>
    </Form>

    <Form
      v-else
      ref="formRef"
      :layout="formState.layout"
      :model="formState"
      v-bind="formItemLayout"
    >
      <Item label="이름" name="nickname">
        <Input v-model:value="formState.data.nickname" />
      </Item>
      <Item label="이메일" name="email">
        <Input v-model:value="formState.data.email" />
      </Item>
      <Item label="핸드폰" name="phone">
        <Input v-model:value="formState.data.phone" />
      </Item>
      <Item label="가입일" name="joinedAt">
        {{ formState.data.joinedAt }}
      </Item>

      <Item label="상태">
        <Select
          v-model:value="formState.data.userStatus.label"
          :options="userStatusOptions"
        ></Select>
      </Item>
    </Form>
  </div>
</template>

<script setup lang="tsx" name="PostDetail">
import { Form, Input, Select, type SelectProps } from 'ant-design-vue'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash-es'
import { type UnwrapRef, computed, reactive, ref, watch } from 'vue'
import type { IManageUser } from '@/services/manage-users/interface'
import { contentModes } from '@/constants/content'
import { getDefaultPost } from '../constant'

const { Item } = Form

type WorkspaceUsers = IManagerUser.UserListRequest
interface PostDetailProps {
  data: WorkspaceUsers
  isEdit: boolean
  mode: contentModes
}

interface FormState {
  layout: 'horizontal' | 'vertical' | 'inline'
  data: WorkspaceUsers
  cloneData: WorkspaceUsers
}

const props = withDefaults(defineProps<PostDetailProps>(), {
  isEdit: false
})

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

const formRef = ref()
const fileUploader = ref()
const formState: UnwrapRef<FormState> = reactive({
  layout: 'horizontal',
  data: getDefaultPost(),
  cloneData: getDefaultPost()
})

const onSubmit = async () => formRef.value.validate()
const formattedDate = (timestamp: number) => dayjs.unix(timestamp).format('YYYY-MM-DD')
const rollbackPost = () => (formState.data = cloneDeep(formState.cloneData))
const getPostDetail = (): WorkspaceUsers => {
  const files = fileUploader.value.getFiles()

  return {
    ...formState.data,
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
    console.log('pp', post)
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
