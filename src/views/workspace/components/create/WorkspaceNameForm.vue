<template>
  <div class="text-wrapper">
    <h1>{{ $t('page.workspace.createStep1Tit') }}</h1>
    <p>{{ $t('page.workspace.createStep1Desc') }}</p>
  </div>

  <div class="form-wrapper">
    <FormItem :isError="isError">
      <Input v-model:value="getFormValues.workspaceName" :placeholder="$t('component.ph.inputTeamOrCompanyName')"
        :maxlength="20" @input="onInput" @press-enter="moveNextStep()" show-count />
      <template #validText> {{ validText }} </template>
    </FormItem>
  </div>
</template>

<script setup lang="ts" name="WorkspaceNameForm">
import { Input } from '@/components/input'
import { ref, toRefs, watch } from 'vue'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { FormItem } from '@/components/form'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const workspaceStore = useWorkspaceStore()
const { setNextBtnDisabled, moveNextStep } = workspaceStore
const { getFormValues } = toRefs(workspaceStore)

const isError = ref(false)
const validText = ref('')

function isValid(value: string) {
  const specialCharRule = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g
  let result = true

  if (specialCharRule.test(value)) {
    isError.value = true
    validText.value = t('message.validate.checkSpecialChar')
    return false
  }

  if (!value.length) result = false

  isError.value = false
  validText.value = ''
  return result
}

const onInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value

  if (!isValid(value)) {
    setNextBtnDisabled(true)
  } else {
    setNextBtnDisabled(false)
  }
}

// function isValid(value: string) {
//   const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g
//   let result = true

//   if (regExp.test(value)) {
//     result = false
//     isError.value = true
//     validText.value = t('message.validate.checkSpecialChar');
//   } else if (!value.length) {
//     result = false
//     isError.value = false
//   } else {
//     isError.value = false
//   }

//   return result
// }

watch(
  getFormValues,
  (formValue) => {
    if (formValue.workspaceName.length) setNextBtnDisabled(false)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped></style>
