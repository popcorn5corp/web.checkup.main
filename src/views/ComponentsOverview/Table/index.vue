<script setup lang="ts" name="ComponentsOverviewTable">
import { BaseSampleService } from '@/services'
import { ref } from 'vue'
import type { IBaseSample } from '@/services/BaseSample/interface'
import { Table } from '@/components/table'
import { columns } from './mock'

const initParam = ref<IBaseSample.BaseSamplesParam>({
  searchEndDate: '',
  searchStartDate: '',
  searchWord: '',
  size: 10,
  page: 1,
  division: 'PUBLIC',
  sort: undefined
})

/**
 * @description 데이터 테이블이 제공하는 기능으로, 리스트 조회 API 를 리턴하여 넘긴다
 * @param param
 */
const getDataSource = (param: IBaseSample.BaseSamplesParam) => {
  return BaseSampleService.getAll(param)
}

/**
 * @description 데이터 테이블 조회 이후 테이블에 바인딩하기 전, 데이터에 대한 전치리
 * @param data
 */
const dataCallback = (data: IBaseSample.BaseSamples['posts']['content']) => {
  return data
}

const getColumns = () => {
  return BaseSampleService.getSortableCodes()
}
</script>
<template>
  <div>
    <Table
      :row-key="'boardId'"
      ref="tableableInstance"
      :columns="columns"
      :data-request="getDataSource"
      :data-callback="dataCallback"
      :init-columns="columns"
      :column-request="getColumns"
      :init-param="initParam"
    >
    </Table>
  </div>
</template>
<style lang="scss" scoped></style>
