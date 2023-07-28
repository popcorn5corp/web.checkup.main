<script setup lang="ts" name="PostDetail">
import { type UnwrapRef, computed, reactive, toRefs, watch, ref, onMounted } from 'vue';
import type { IBaseSample } from '@/services/BaseSample/interface';
import _ from 'lodash-es';
import { getDefaultPost } from '../constant';

interface PostDetailProps {
  data: IBaseSample.BaseSample
  isEdit: boolean;
  mode: ContentMode
}

const props = withDefaults(defineProps<PostDetailProps>(), {
  isEdit: false
})

interface FormState {
  layout: 'horizontal' | 'vertical' | 'inline';
  post: PostDetailProps['data']
  clonePost: PostDetailProps['data']
}

const formRef = ref();
const formState: UnwrapRef<FormState> = reactive({
  layout: 'horizontal',
  post: getDefaultPost(),
  clonePost: getDefaultPost(),
});

watch(() => props.data, (post) => {
  formState.post = post;
  formState.clonePost = _.cloneDeep(post);
},
  {
    immediate: true
  })

const rollbackPost = () => {
  formState.post = _.cloneDeep(formState.clonePost)
}

const getPostDetail = () =>
  formState.post;

const formItemLayout = computed(() => {
  const { layout } = formState;
  return layout === 'horizontal'
    ? {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    : {};
});

const buttonItemLayout = computed(() => {
  const { layout } = formState;
  return layout === 'horizontal'
    ? {
      wrapperCol: { span: 14, offset: 4 },
    }
    : {};
});

const onSubmit = async () => {
  return formRef.value.validate()
}

defineExpose({
  getPostDetail,
  rollbackPost,
  onSubmit
})
</script>
<template>
  <div class="post-detail">
    <a-form v-if="!isEdit" :layout="formState.layout" :model="formState" v-bind="formItemLayout">
      <a-form-item label="게시물 제목">
        <div>
          {{ formState.post.boardTitle }}
        </div>
      </a-form-item>
      <a-form-item label="게시물 내용">
        <div>
          {{ formState.post.boardContent }}
        </div>
      </a-form-item>
      <a-form-item label="생성일">
        <div>
          {{ formState.post.createdAt }}
        </div>
      </a-form-item>
      <a-form-item label="게시물 구분">
        <div>
          {{ formState.post.division }}
        </div>
      </a-form-item>
    </a-form>


    <a-form v-else ref="formRef" :layout="formState.layout" :model="formState" v-bind="formItemLayout">
      <a-form-item label="게시물 제목" name="boardTitle">
        <a-input v-model:value="formState.post.boardTitle" />
      </a-form-item>
      <a-form-item label="게시물 내용">
        <a-input v-model:value="formState.post.boardContent" />
      </a-form-item>
      <a-form-item label="생성일">
        <a-input v-model:value="formState.post.createdAt" />
      </a-form-item>
      <a-form-item label="게시물 구분">
        <a-input v-model:value="formState.post.division" />
      </a-form-item>
    </a-form>
  </div>
</template>
<style lang="scss" scoped>
.post-detail {
  margin: 50px 0px;

  :deep(.ant-form) {
    .ant-form-item-label {
      >label {
        font-weight: 500;
      }
    }
  }
}
</style>