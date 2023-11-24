<template>
  <div class="text-wrapper">
    <h1>{{ $t('page.workspace.createStep4Tit') }}</h1>
    <p>{{ $t('page.workspace.createStep4Desc') }}</p>
  </div>
  <div class="form-wrapper">
    <Select
      key="businessType"
      :options="businessTypeOpt"
      v-model:value="getFormValues.businessTypeCode"
    />
    <Select
      key="emlpoyeeScale"
      :options="emlpoyeeScaleOpt"
      v-model:value="getFormValues.employeeScaleCode"
    />
  </div>
</template>

<script setup lang="ts" name="BuisnessTypeForm">
import { Select } from 'ant-design-vue'
import { ref, toRefs, watch } from 'vue'
import { useWorkspaceStore } from '@/stores/modules/workspace'

const workspaceStore = useWorkspaceStore()
const { getFormValues } = toRefs(workspaceStore)
// TODO 추후 서버에서 내려준 옵션값으로 변경
const businessTypeOpt = ref([
  {
    value: '',
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
    value: '',
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

watch(
  getFormValues,
  (formValue) => {
    workspaceStore.setNextBtnDisabled(
      formValue.businessTypeCode.length && formValue.employeeScaleCode.length ? false : true
    )
  },
  { immediate: true, deep: true }
)
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
      font-size: 16px;
      padding: 0 15px;
      input {
        height: 100% !important;
        padding: 0 !important;
      }
      .ant-select-selection-item {
        padding-top: 4px;
      }
    }
  }
}
@include xxs {
  .form-wrapper {
    flex-direction: column;
  }
}
</style>
