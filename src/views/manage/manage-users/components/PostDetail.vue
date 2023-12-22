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
        <Item name="profileImg">
          <div class="img-wrapper">
            <img :src="formState.data.thumbnail?.url" :width="200" :height="200" />
          </div>
        </Item>
      </div>
      <div class="form-item-wrapper">
        <Item label="이름" name="nickname">
          {{ formState.data.nickname }}
        </Item>
        <Item label="상태" name="userStatus">
          {{ formState.data.userStatus.label }}
        </Item>
        <Item label="이메일" name="email">
          {{ formState.data.email }}
        </Item>
        <Item label="핸드폰" name="phone">
          {{ formState.data.phone }}
        </Item>
        <Item label="가입일" name="joinDate">
          {{ formState.data.joinDate }}
        </Item>
      </div>
      <!-- <div class="more-wrapper">
        <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
      </div> -->
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
      <Item label="상태">
        <Select
          v-model:value="formState.data.userStatus.label"
          :options="userStatusOptions"
        ></Select>
      </Item>
      <Item label="이메일" name="email">
        <Input v-model:value="formState.data.email" />
      </Item>
      <Item label="핸드폰" name="phone">
        <Input v-model:value="formState.data.phone" />
      </Item>
      <Item label="가입일" name="joinDate">
        {{ formState.data.joinDate }}
      </Item>
    </Form>
  </div>
</template>

<script setup lang="tsx" name="PostDetail">
import { Form, Input, Select, type SelectProps } from 'ant-design-vue'
import { cloneDeep } from 'lodash-es'
import { type UnwrapRef, computed, reactive, ref, watch } from 'vue'
import type { IManageUser } from '@/services/manage-users/interface'
import { contentModes } from '@/constants/content'
import { getDefaultPost } from '../constant'

const { Item } = Form

type WorkspaceUsers = IManageUser.UserListRequest
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
        // labelCol: { span: 6 },
        // wrapperCol: { span: 14 }
      }
    : {}
})

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
    flex-direction: row;
    align-items: center;

    .img-wrapper {
      flex: 0.5;
      > img {
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

  .more-wrapper {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  :deep(.ant-form) {
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
      padding: 0 1rem;
      margin-bottom: 10px;
    }
  }
}
</style>
