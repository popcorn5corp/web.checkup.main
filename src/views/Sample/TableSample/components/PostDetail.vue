<script setup lang="tsx" name="PostDetail">
import { Form, Input, Select, type SelectProps } from 'ant-design-vue'
import dayjs, { Dayjs } from 'dayjs'
import { cloneDeep } from 'lodash-es'
import { type UnwrapRef, computed, reactive, ref, watch } from 'vue'
import type { IBaseSample } from '@/services/BaseSample/interface'
import { FileUploader } from '@/components/FileUploader'
import { getDefaultPost } from '../constant'

const { Item } = Form

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

const divisionOptions = ref<SelectProps['options']>([
  {
    value: 'PRIVATE',
    label: 'PRIVATE'
  },
  {
    value: 'PUBLIC',
    label: 'PUBLIC'
  }
])

const formRef = ref()
const formState: UnwrapRef<FormState> = reactive({
  layout: 'horizontal',
  post: getDefaultPost(),
  clonePost: getDefaultPost()
})

const onSubmit = async () => formRef.value.validate()
const formattedDate = (date: Dayjs | string) => dayjs(date).format('YYYY-MM-DD')
const rollbackPost = () => (formState.post = cloneDeep(formState.clonePost))
const getPostDetail = (): Post => ({
  ...formState.post
  // createdAt: dayjs(formState.post.createdAt).format('YYYY-MM-DD')
})

const formItemLayout = computed(() => {
  const { layout } = formState
  return layout === 'horizontal'
    ? {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      }
    : {}
})

const buttonItemLayout = computed(() => {
  const { layout } = formState
  return layout === 'horizontal'
    ? {
        wrapperCol: { span: 14, offset: 4 }
      }
    : {}
})

watch(
  () => props.data,
  (post) => {
    formState.post = {
      ...post,
      createdAt: dayjs(post.createdAt)
    }
    formState.clonePost = cloneDeep(post)
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
<template>
  <div class="post-detail">
    <Form v-if="!isEdit" :layout="formState.layout" :model="formState" v-bind="formItemLayout">
      <Item label="게시물 제목">
        {{ formState.post.boardTitle }}
      </Item>
      <Item label="게시물 내용">
        {{ formState.post.boardContent }}
      </Item>
      <Item label="생성일">
        {{ formattedDate(formState.post.createdAt) }}
      </Item>
      <Item label="게시물 구분">
        {{ formState.post.division }}
      </Item>
    </Form>

    <Form
      v-else
      ref="formRef"
      :layout="formState.layout"
      :model="formState"
      v-bind="formItemLayout"
    >
      <Item label="게시물 제목" name="boardTitle">
        <Input v-model:value="formState.post.boardTitle" />
      </Item>
      <Item label="게시물 내용">
        <Input v-model:value="formState.post.boardContent" />
      </Item>
      <Item label="생성일">
        {{ formattedDate(formState.post.createdAt) }}
      </Item>
      <Item label="게시물 구분">
        <Select v-model:value="formState.post.division" :options="divisionOptions"></Select>
      </Item>
      <Item label="게시물 첩부파일">
        <FileUploader />
      </Item>
    </Form>
  </div>
</template>
<style lang="scss" scoped>
.post-detail {
  margin: 50px 0px;

  :deep(.ant-form) {
    .ant-form-item-label {
      > label {
        font-weight: 500;
      }
    }
  }
}
</style>
