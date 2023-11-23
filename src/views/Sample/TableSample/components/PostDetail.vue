<script setup lang="tsx" name="PostDetail">
import { BaseSampleService } from '@/services'
import { Form, Input, Select, type SelectProps } from 'ant-design-vue'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash-es'
import { type UnwrapRef, computed, reactive, ref, watch } from 'vue'
import type { IBaseSample, ICode } from '@/services/BaseSample/interface'
import { FileUploader } from '@/components/file-uploader'
import { fileTypes } from '@/constants/file'
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

const permissionCodes = ref<ICode[]>([])
const divisionOptions = ref<SelectProps['options']>([
  {
    label: '비공개',
    value: 'PRIVATE'
  },
  {
    label: '공개',
    value: 'PUBLIC'
  }
])

const SAMPLE_FILE_TYPE = fileTypes.TEST

const formRef = ref()
const fileUploader = ref()
const formState: UnwrapRef<FormState> = reactive({
  layout: 'horizontal',
  post: getDefaultPost(),
  clonePost: getDefaultPost()
})

;(async () => {
  permissionCodes.value = await BaseSampleService.getPermissionCodes()
})()

const onSubmit = async () => formRef.value.validate()
const formattedDate = (timestamp: number) => dayjs.unix(timestamp).format('YYYY-MM-DD')
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
      ...post
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
      <Item label="권한">
        {{ formState.post.permission }}
      </Item>
      <Item label="게시물 구분">
        {{ formState.post.division }}
      </Item>
      <!-- <Item label="게시물 첩부파일">
        <FileUploader :files="formState.post.boardFiles" readonly />
      </Item> -->
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
      <Item label="권한">
        <Select
          v-model:value="formState.post.permission"
          :options="(permissionCodes as any)"
        ></Select>
      </Item>
      <Item label="게시물 구분">
        <Select v-model:value="formState.post.division" :options="divisionOptions"></Select>
      </Item>
      <!-- <Item label="게시물 첩부파일">
        <FileUploader
          ref="fileUploader"
          :files="formState.post.boardFiles"
          :type="SAMPLE_FILE_TYPE"
        />
      </Item> -->
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
