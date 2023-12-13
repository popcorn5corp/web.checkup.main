<template>
  <div class="text-wrapper" v-if="props.isShowDescription">
    <h1>{{ $t('page.workspace.createStep3Tit') }}</h1>
    <p>{{ $t('page.workspace.createStep3Desc') }}</p>
  </div>
  <div class="form-wrapper">
    <small>{{ $t('page.workspace.createStep3Info') }}</small>
    <small v-if="isError" style="color: red; margin-left: 10px">{{ errMsg }}</small>
    <div class="select-wrapper" @click="inputRef.focus()">
      <div class="tags-wrapper">
        <template v-for="tag in tags" :key="tag">
          <div class="tag">
            <span class="text">{{ tag }}</span>
            <span class="icon" @click="onRemove(tag)"><CloseOutlined /></span>
          </div>
        </template>
      </div>
      <div class="input-wrapper">
        <div class="input-box">
          <Input
            ref="inputRef"
            class="input"
            :placeholder="$t('component.ph.inputEmail')"
            v-model:value="emailRef"
            @pressEnter="onInputEnter"
            @focusout="onInputEnter"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="InviteMemberForm">
import { CloseOutlined } from '@ant-design/icons-vue'
import { Input, message } from 'ant-design-vue'
import { type CSSProperties, computed, ref, toRefs } from 'vue'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWorkspaceStore } from '@/stores/modules/workspace'

const { t } = useI18n()
const workspaceStore = useWorkspaceStore()
const { getFormValues } = toRefs(workspaceStore)

const props = defineProps({
  isShowDescription: {
    type: Boolean,
    default: true
  }
})

const isError = ref(false)
const errMsg = ref('')
const emailRef = ref('')
const inputRef = ref()

const tags = computed(() => [...getFormValues.value.inviteEmails])
const errorTagStyle = computed<CSSProperties>(() => {
  return {
    borderColor: isError.value ? '#ff4d4f' : '#d9d9d9'
  }
})

;(async () => {
  workspaceStore.setNextBtnDisabled(false)
})()

const onInputEnter = async (event: KeyboardEvent) => {
  const emailValue = (event.target as HTMLInputElement).value
  const regExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/

  try {
    if (!emailValue) return
    if (!regExp.test(emailValue)) {
      handleError(t('common.message.emailError'))
    } else if (tags.value.includes(emailValue)) {
      handleError(t('common.message.emailDuplicatedError'))
    } else {
      emailRef.value = ''
      workspaceStore.pushFormValueInviteEmails(emailValue.trim())
      resetError()
    }
  } catch (err) {
    message.error(t('common.message.reTry'))
  }
}

const onInitInviteEmails = () => {
  workspaceStore.initFormValueInviteEmails()
}

const onRemove = (tag: string) => {
  workspaceStore.removeFormValueInviteEmails(tag)
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

defineExpose({
  isError,
  tags,
  onInputEnter,
  onInitInviteEmails
})
</script>

<style lang="scss" scoped>
.form-wrapper {
  .select-wrapper {
    min-height: 130px;
    max-height: 227px;
    background-color: $color-white;
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
        color: $color-black;
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
