<template>
  <div class="manage-group-container">
    <DynamicTable
      v-model:openDetail="showDetail"
      rowKey="key"
      :columns="columns"
      :data-request="getDataSource"
      :filter-request="getFilters"
      @row-click="onClickRow"
    >
      <template #detail-title>
        <span> 게시물 상세 </span>
      </template>

      <template #detail-content>
        <div class="detail-contents">
          <div class="tab-wrapper">
            <PostDetail ref="postDetailRef" :data="selectedPost" :isEdit="isEdit" :mode="mode" />

            <a-tabs v-model:activeKey="activeKey">
              <a-tab-pane key="1" tab="상세보기">
                <GroupDetail />
              </a-tab-pane>

              <a-tab-pane key="2" tab="타임라인" force-render>
                <GroupHistory />
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </template>
    </DynamicTable>
  </div>
</template>

<script setup lang="ts" name="ManageGroup">
import { BaseSampleService } from '@/services'
import { computed, ref, unref, watch } from 'vue'
import type { IBaseSample } from '@/services/BaseSample/interface'
import { DynamicTable } from '@/components/dynamic-table'
import { contentModes as modes } from '@/constants/content'
import GroupDetail from './components/GroupDetail.vue'
import GroupHistory from './components/GroupHistory.vue'
import PostDetail from './components/PostDetail.vue'
import { getDefaultPost } from './constant'
import { columns } from './mock'

const showDetail = ref(false)
const isLoading = ref(false)
const activeKey = ref('1')

const DEFAULT_MODE = modes.R
const mode = ref<ContentMode>(DEFAULT_MODE)
const isEdit = computed(() => mode.value === modes.C || mode.value === modes.U)

watch(
  () => unref(showDetail),
  (showDetail) => {
    if (!showDetail) {
      selectedPost.value = getDefaultPost()
    }
  }
)

const selectedPost = ref<IBaseSample.BaseSample>(getDefaultPost())

const getDataSource = (param: IBaseSample.BaseSamplesParam) => {
  return BaseSampleService.getAll(param)
}

const getFilters = () => {
  return BaseSampleService.getPageInfo()
}

const onClickRow = (row: IBaseSample.Content): void => {
  // openDrawer.value = true
  showDetail.value = true
  // isOpen.value = true
  isLoading.value = true
  mode.value = DEFAULT_MODE

  BaseSampleService.getOneById(row.boardId).then(({ success, data }) => {
    if (success) {
      selectedPost.value = data
    }

    setTimeout(() => {
      isLoading.value = false
    }, 200)
  })
}
</script>

<style lang="scss" scoped>
:deep(.ant-tabs-nav-list) {
  width: 100%;
  .ant-tabs-tab {
    flex: 0.5;
    .ant-tabs-tab-btn {
      margin: 0 auto;
    }
  }
}

:deep(.ant-tabs-tab-active) {
  .ant-tabs-tab-btn {
    font-weight: 600 !important;
  }
}

:deep(.ant-tabs-ink-bar) {
  height: 3px !important;
}
</style>
