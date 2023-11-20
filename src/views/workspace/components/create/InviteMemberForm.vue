<template>
  <div class="text-wrapper">
    <h2>팀원 또는 직장 동료 추가</h2>
    <p>이메일 형식으로 직장동료를 추가 해주세요.</p>
  </div>
  {{ formValues.inviteEmails }}
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
            @pressEnter="onInputEnter"
            @focusout="onInputEnter"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CloseOutlined } from '@ant-design/icons-vue'
import { Input, message } from 'ant-design-vue'
import { type CSSProperties, computed, ref } from 'vue'
import { watch } from 'vue'
import { useWorkspceStore } from '@/stores/modules/workspace'

const workspaceStore = useWorkspceStore()

const isError = ref(false)
const errMsg = ref('')
const emailRef = ref('')
const inputRef = ref()

const tags = computed(() => [...formValues.value.inviteEmails])
const formValues = computed(() => workspaceStore.formValues)
const errorTagStyle = computed<CSSProperties>(() => {
  return {
    borderColor: isError.value ? '#ff4d4f' : '#d9d9d9'
    // color: isError.value ? '#ff4d4f' : 'inherit',
    // #d9d9d9 // rgba(5, 5, 5, 0.06) // 약간주황: #ffccc7
    // background: isError.value ? '#fff2f0' : 'rgba(0, 0, 0, 0.06)',
    // display: isError.value ? 'none' : 'inline-flex'
  }
})

const onInputEnter = async (event: KeyboardEvent) => {
  const emailValue = (event.target as HTMLInputElement).value
  const regExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/

  try {
    if (!emailValue) return
    if (!regExp.test(emailValue)) {
      handleError('이메일형식이 올바르지 않습니다. 다시 작성해주세요.')
    } else if (tags.value.includes(emailValue)) {
      handleError('이미 추가된 이메일입니다. 다시 작성해주세요.')
    } else {
      emailRef.value = ''
      tags.value.push(emailValue.trim())
      workspaceStore.setFormValueInviteEmails(tags.value)
      resetError()
    }
  } catch (err) {
    message.error('잠시 후 다시 시도해주세요.')
  }
}

const onRemove = (idx: number) => {
  const filteredTag = tags.value.filter((_, index) => index !== idx)
  workspaceStore.setFormValueInviteEmails(filteredTag)
}

const handleError = (message: string) => {
  errMsg.value = message
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
    border-color: v-bind('errorTagStyle.borderColor');
    border-radius: 6px;
    padding: 5px;
    margin-top: 5px;
    overflow-y: auto;
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
</style>
