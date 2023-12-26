<template>
  <div class="user-detail-container">
    <h3 class="title">상세정보</h3>
    <div class="content-wrapper">
      <Descriptions>
        <Descriptions.Item label="가입일" :span="12">
          {{ state.data.detail?.joinDate }}
        </Descriptions.Item>
        <Descriptions.Item label="성별" :span="12">
          {{ state.data.detail?.gender.label }}
        </Descriptions.Item>
      </Descriptions>
    </div>
    <h3 class="title">그룹</h3>
    <div class="content-wrapper">
      <div class="group-wrapper">
        <template v-if="props.data.groups?.length">
          <span v-for="group in props.data.groups" :key="group.groupId" class="group-item">
            {{ group.name }}
          </span>
        </template>
        <template v-else> - </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Descriptions } from 'ant-design-vue'
import { reactive, watch } from 'vue'

interface PostDetailProps {
  data: {
    detail: {
      joinDate: string
      gender: {
        label: string
        value: string
      }
    }
    groups: GroupData[]
  }
}
type GroupData = {
  groupId: string
  name: string
  url: string
}
const props = defineProps<PostDetailProps>()

const state = reactive({
  data: {
    detail: {
      joinDate: '',
      gender: {
        label: '',
        value: ''
      }
    },
    groups: [] as GroupData[]
  }
})

watch(
  () => props.data,
  (data) => {
    state.data = {
      ...data
    }
    console.log('daaadda', data)
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="scss" scoped>
.user-detail-container {
  padding: 10px;
  padding-bottom: 20px;
  .title {
    font-weight: 700;
    padding: 10px 0;
  }
  .content-wrapper {
    padding: 0 10px;
  }

  .group-wrapper {
    display: flex;
    gap: 10px;
    flex-direction: row;
    flex-wrap: wrap;
    .group-item {
      padding: 5px 17px;
      background: $color-gray-4;
    }
  }
}
</style>
