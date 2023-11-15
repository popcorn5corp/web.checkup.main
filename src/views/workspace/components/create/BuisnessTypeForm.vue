<template>
  <div class="text-wrapper">
    <h2>업종과 규모를 선택해주세요</h2>
    <p>팀/회사의 업종과 팀/회사의 규모(인원수)를 선택해주세요.</p>
  </div>
  <div class="form-wrapper">
    <Select
      :options="businessTypeOpt"
      v-model:value="formValues.businessTypeCode"
      placeholder="업종 선택"
    />
    <Select
      :options="emlpoyeeScaleOpt"
      v-model:value="formValues.employeeScaleCode"
      placeholder="규모 선택"
    />
  </div>
</template>

<script lang="ts" setup>
import { Select } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { useWorkspceStore } from '@/stores/modules/workspace'

const workspaceStore = useWorkspceStore()
const formValues = computed(() => workspaceStore.formValues)

const businessTypeOpt = ref([
  {
    value: null,
    label: '업종 선택'
  },
  {
    value: 'MANUFACTURING',
    label: '제조업'
  },
  {
    value: 'IT',
    label: 'IT업'
  },
  {
    value: 'CONSTRUCTION',
    label: '건설업'
  }
])
const emlpoyeeScaleOpt = ref([
  {
    value: null,
    label: '규모 선택'
  },
  {
    value: 'FEWER_THAN_10',
    label: '10명 미만'
  },
  {
    value: 'FEWER_THAN_50',
    label: '50명 미만'
  },
  {
    value: 'FEWER_THAN_100',
    label: '100명 미만'
  },
  {
    value: 'BETWEEN_100_AND_500',
    label: '100 ~ 500명'
  },
  {
    value: 'BETWEEN_500_AND_1000',
    label: '500 ~ 1000명'
  },
  {
    value: 'MORE_THAN_1000',
    label: '1000명 이상'
  }
])
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  .ant-select {
    flex: 1 0;
    :deep(.ant-select-selector) {
      height: 40px !important;
      display: flex;
      align-items: center;
    }
  }
}
@include xxs {
  .form-wrapper {
    flex-direction: column;
  }
}
</style>
