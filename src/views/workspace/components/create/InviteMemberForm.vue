<template>
  <div class="text-wrapper">
    <h2>팀원 또는 직장 동료 추가</h2>
    <p>이메일 형식으로 직장동료를 추가 해주세요.</p>
  </div>
  <div class="form-wrapper">
    <small>이메일 작성 후 엔터키(enter)</small>
    <small v-if="isError" style="color: red; margin-left: 10px">{{ errMsg }}</small>
    <div class="select-wrapper" @click="inputRef.focus()">
      <div class="tags-wrapper">
        <template v-for="(tag, idx) in tags" :key="tag">
          <div class="tag">
            <span class="text">{{ tag }}</span>
            <span class="icon" @click="onRemove(idx)"><CloseOutlined /></span>
          </div>
        </template>
      </div>
      <div class="input-wrapper">
        <div class="input-box">
          <Input
            ref="inputRef"
            class="input"
            placeholder="이메일을 작성해주세요."
            v-model:value="emailRef"
            @pressEnter="onInput"
          />
        </div>
      </div>
    </div>
    <!-- <Select
      ref="emailSelect"
      v-model:value="formValues.inviteEmails"
      mode="tags"
      style="width: 100%"
      :status="isError ? 'error' : ''"
      :token-separators="[',']"
      :default-open="false"
      :dropdown-style="{ display: 'none !important' }"
      @change="handleChange"
    />-->
  </div>
</template>

<script lang="ts" setup>
import { CloseOutlined } from '@ant-design/icons-vue'
import { Input, message as Message, Select } from 'ant-design-vue'
import { type CSSProperties, computed, ref } from 'vue'
import { watch } from 'vue'
import { useWorkspceStore } from '@/stores/modules/workspace'

const workspaceStore = useWorkspceStore()

const tags = ref<string[]>([])
const isError = ref(false)
const errMsg = ref('')
const emailRef = ref('')
const inputRef = ref()

const formValues = computed(() => workspaceStore.formValues)
const errorTagStyle = computed<CSSProperties>(() => {
  return {
    // color: isError.value ? '#ff4d4f' : 'inherit',
    borderColor: isError.value ? '#ff4d4f' : '#d9d9d9'
    // #d9d9d9 // rgba(5, 5, 5, 0.06) // 약간주황: #ffccc7
    // background: isError.value ? '#fff2f0' : 'rgba(0, 0, 0, 0.06)',
    // display: isError.value ? 'none' : 'inline-flex'
  }
})

;(async () => {
  if (formValues.value.inviteEmails) {
    tags.value.push(...formValues.value.inviteEmails)
  }
})()

const onInput = (event: KeyboardEvent) => {
  const emailValue: string = (event.target as HTMLInputElement).value.trim()
  const regExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/

  if (!regExp.test(emailValue)) {
    showError('이메일형식이 올바르지 않습니다. 삭제 후 다시 작성해주세요.')
  } else if (tags.value.includes(emailValue)) {
    showError('중복된 이메일입니다. 다시 작성해주세요.')
  } else {
    emailRef.value = ''
    tags.value.push(emailValue)
    resetError()
  }
}

const onRemove = (idx: number) => {
  const filteredTag = tags.value.filter((_, index) => index !== idx)
  tags.value = filteredTag
}

const showError = (message: string) => {
  errMsg.value = message
  Message.error(message)
  isError.value = true
  workspaceStore.setNextBtnDisabled(true)
}

const resetError = () => {
  isError.value = false
  workspaceStore.setNextBtnDisabled(false)
}

watch(emailRef, () => {
  if (!emailRef.value.length) {
    resetError()
  }
})

watch(
  tags,
  () => {
    formValues.value.inviteEmails = tags.value
  },
  { immediate: true }
)
// const handleChange = (value: []) => {
//   console.log('change')
//   let regExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/
//   if (value?.length === 0) {
//     isError.value = false
//     workspaceStore.setNextBtnDisabled(false)
//   } else {
//     value.forEach((email) => {
//       console.log('value', value)
//       if (!regExp.test(email)) {
//         message.error('이메일형식이 올바르지 않습니다. 삭제 후 다시 작성해주세요.')
//         isError.value = true
//         workspaceStore.setNextBtnDisabled(true)
//       } else {
//         isError.value = false
//         workspaceStore.setNextBtnDisabled(false)
//       }
//     })
//   }
// }
</script>

<style lang="scss" scoped>
.form-wrapper {
  small {
    font-weight: 400;
    font-size: 14px;
    color: #888;
    margin-left: 3px;
  }
  .select-wrapper {
    min-height: 130px;
    max-height: 227px;
    background-color: #fff;
    border: 1px solid;
    // #d9d9d9
    border-color: v-bind('errorTagStyle.borderColor');
    border-radius: 6px;
    padding: 5px;
    margin-top: 5px;
    overflow-y: scroll;
    cursor: text;
    .tags-wrapper {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 4px;
      .tag {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(0, 0, 0, 0.06);
        color: #000;
        margin: 2px 0;
        margin-right: 7px;
        padding: 4px;
        padding-left: 10px;
        border-color: rgba(5, 5, 5, 0.06);
        border-radius: 6px;
        font-weight: 400;
        font-size: 15px;
        gap: 2px;
        .icon {
          color: rgba(0, 0, 0, 0.45);
          font-size: 13px;
          padding: 5px;
          cursor: pointer;
        }
      }
    }
    .input-wrapper {
      flex: none;
      align-self: center;
      width: 100%;
      .input-box {
        display: inline-flex;
        position: relative;
        width: 100%;
        .input {
          width: 100%;
          height: 24px;
          line-height: 24px;
          margin: 0;
          font-size: 14px !important;
          padding: 3px 5px !important;
          background-color: transparent !important;
          border: none;
          outline: none;
          box-shadow: none;
        }
      }
    }
  }
}
// :deep(.ant-select-selector) {
//   min-height: 130px !important;
//   align-items: flex-start;
//   padding: 5px;
// }
// :deep(.ant-select-selection-item) {
//   font-size: 14px;
// }
// :deep(.ant-select-selection-overflow-item:nth-last-child(2)) {
//   .ant-select-selection-item {
//     color: v-bind('errorTagStyle.color');
//     border-color: v-bind('errorTagStyle.borderColor');
//     background: v-bind('errorTagStyle.background');
//   }
//   .ant-select-selection-item-remove {
//     color: v-bind('errorTagStyle.color');
//   }
// }
// :deep(.ant-select-selection-overflow-item:last-child) {
//   display: v-bind('errorTagStyle.display');
// }
</style>
