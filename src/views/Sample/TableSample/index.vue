<script setup lang="ts" name="TableSample">
import { computed, reactive, ref, type UnwrapRef } from 'vue'
import { Modal } from 'ant-design-vue'
import DynamicTable from '@/components/Table'
import { columns } from '@/components/Table/mock'
import BaseSampleService from '@/services/BaseSample/index'
import type { IBaseSample } from '@/services/BaseSample/interface'

const isOpen = ref(false);
const initParam = ref<IBaseSample.BaseSamplesParam>({
  searchEndDate: '',
  searchStartDate: '',
  searchWord: '',
  size: 10,
  page: 1,
  division: ''
})

const selectedContent = ref()

// FilterTable 테스트용==========
const dataSource = ref<IBaseSample.BaseSamples['posts']['content']>([])
BaseSampleService.getAll({} as any).then((res) => {
  dataSource.value = res.posts.content
})
// ============================

const onClickRow = (row: IBaseSample.Content) => {
  isOpen.value = true;

  BaseSampleService.getOneById(row.boardId).then(content => {
    selectedContent.value = content;
  })
}

const getDataSource = (params: IBaseSample.BaseSamplesParam) => {
  return BaseSampleService.getAll(params);
}

const dataCallback = (data: IBaseSample.BaseSamples['posts']['content']) => {
  return data;
}

</script>

<template>
  <!-- <FilterTable :dataSource="dataSource" :columns="columns" :options="{
    isShowNo: true
  }" /> -->
  <DynamicTable :columns="columns" :request="getDataSource" :dataCallback="dataCallback" :initParam="initParam"
    @rowClick="onClickRow" />

  <Modal v-model:open="isOpen" title="게시물 상세">
    <div class="post-detail">

    </div>
  </Modal>
</template>
<style lang="scss" scoped></style>
