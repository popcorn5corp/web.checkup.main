<template>
  <div class="text-wrapper">
    <h1>{{ $t('page.workspace.createStep4Tit') }}</h1>
    <p>{{ $t('page.workspace.createStep4Desc') }}</p>
  </div>
  <div class="form-wrapper">
    <Select
      key="businessType"
      :options="option.businessTypeOpt"
      v-model:value="getFormValues.businessTypeCode"
    />
    <Select
      key="employeeScale"
      :options="option.employeeScaleOpt"
      v-model:value="getFormValues.employeeScaleCode"
    />
  </div>
</template>

<script setup lang="ts" name="BuisnessTypeForm">
import { WorkspaceService } from '@/services'
import { Select } from 'ant-design-vue'
import { reactive, toRefs, watch } from 'vue'
import { useWorkspaceStore } from '@/stores/modules/workspace'

const workspaceStore = useWorkspaceStore()
const { getFormValues } = toRefs(workspaceStore)

interface ReactiveType {
  businessTypeOpt: LabelValue<string>[]
  employeeScaleOpt: LabelValue<string>[]
}
const option = reactive<ReactiveType>({
  businessTypeOpt: [],
  employeeScaleOpt: []
})

;(async () => {
  try {
    const { data: buisnessTypeOpt } = await WorkspaceService.getBusinessType()
    option.businessTypeOpt = buisnessTypeOpt.codes
    option.businessTypeOpt.unshift({
      label: '업종 선택',
      value: ''
    })

    const { data: employeeScaleOpt } = await WorkspaceService.getEmployeeScale()
    option.employeeScaleOpt = employeeScaleOpt.codes
    option.employeeScaleOpt.unshift({
      label: '규모 선택',
      value: ''
    })
  } catch (err) {
    console.log(err)
  }
})()

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
