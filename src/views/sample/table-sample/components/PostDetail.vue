<script setup lang="tsx" name="PostDetail">
import { BaseSampleService } from '@/services'
import { type SelectProps } from 'ant-design-vue'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash-es'
import { type UnwrapRef, computed, reactive, ref, watch } from 'vue'
import type { IBaseSample, ICode } from '@/services/base-sample/types'
import { Form, FormItem } from '@/components/form'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
// import { FileUploader } from '@/components/file-uploader'
// import { fileTypes } from '@/constants/file'
import { getDefaultPost } from '../constant'

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

// const SAMPLE_FILE_TYPE = fileTypes.TEST

const formRef = ref()
const fileUploader = ref()
const formState: UnwrapRef<FormState> = reactive({
  layout: 'horizontal',
  post: getDefaultPost(),
  clonePost: getDefaultPost()
})

;(async () => {
  permissionCodes.value = BaseSampleService.permissionCodes
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

// const buttonItemLayout = computed(() => {
//   const { layout } = formState
//   return layout === 'horizontal'
//     ? {
//         wrapperCol: { span: 14, offset: 4 }
//       }
//     : {}
// })

watch(
  () => props.data,
  (post) => {
    formState.post = {
      ...post,
      createdAt: formattedDate(Number(post.createdAt))
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
      <FormItem label="게시물 제목">
        {{ formState.post.boardTitle }}
      </FormItem>
      <FormItem label="게시물 내용">
        {{ formState.post.boardContent }}
      </FormItem>
      <FormItem label="생성일">
        {{ formState.post.createdAt }}
      </FormItem>
      <FormItem label="권한">
        {{ formState.post.permission.value }}
      </FormItem>
      <FormItem label="게시물 구분">
        {{ formState.post.division.value }}
      </FormItem>
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
      <FormItem name="boardTitle">
        <Input v-model:value="formState.post.boardTitle" label="게시물 제목" />
      </FormItem>
      <FormItem>
        <Input v-model:value="formState.post.boardContent" label="게시물 내용" />
      </FormItem>
      <FormItem>
        <Input v-model:value="formState.post.createdAt" label="생성일" disabled />
      </FormItem>
      <FormItem>
        <!-- <Select
          v-model:value="formState.post.permission.label"
          :options="(permissionCodes as any)"
        ></Select> -->
        <Select
          v-model:value="formState.post.permission.label"
          :options="(permissionCodes as any)"
          label="권한"
        />
      </FormItem>
      <FormItem>
        <Select
          v-model:value="formState.post.division.label"
          :options="divisionOptions"
          label="게시물 구분"
        />
      </FormItem>
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
    .ant-form-item {
      margin-bottom: 0;
    }
    .ant-form-item-label {
      > label {
        font-weight: 500;
      }
    }
    .ant-row {
      justify-content: center;
    }
  }
}
</style>
