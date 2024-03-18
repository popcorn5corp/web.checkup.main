<template>
  <div class="text-wrapper">
    <h1>{{ $t('message.validate.checkName') }}</h1>
    <p>
      {{ $t('page.workspace.nameProfileDesc') }}
    </p>
  </div>
  <div class="form-wrapper">
    <FormItem :isError="isError">
      <Input
        v-model:value="getFormValues.nickname"
        :placeholder="$t('message.validate.checkName')"
        :maxlength="10"
        @input="onInput"
        @press-enter="moveNextStep()"
        show-count
      />

      <template #validText>{{ validText }}</template>
    </FormItem>

    <div class="profile-wrapper">
      <h2>{{ $t('page.workspace.profileImg') }}</h2>
      <div class="profile-box">
        <div class="img-wrapper">
          <img :src="seletedImg" alt="출처 Freepik" />
        </div>

        <div>
          <p>
            {{ $t('page.workspace.profileImgDesc') }}
          </p>
          <div class="btn-wrapper">
            <Button
              :label="$t('component.button.selectImgBtn')"
              class="btn"
              @click="modalVisible = true"
            />
            <span>{{ $t('common.or') }}</span>
            <FileUploader ref="fileUploader" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal
    :open="modalVisible"
    :title="$t('component.button.selectImg')"
    width="620px"
    centered
    :bodyStyle="{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem'
    }"
    wrapClassName="modal-wrapper"
    :footer="false"
    @cancel="modalVisible = false"
  >
    <div v-for="profileImg in profileList" :key="profileImg.url">
      <div class="profile-img-wrapper">
        <img :src="profileImg.url" alt="출처 Freepik" class="profile-img" />
        <div class="img-masking" @click="onClickImg(profileImg)">
          <span>{{ $t('common.select') }}</span>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup name="NameProfileForm">
import { WorkspaceService } from '@/services'
import { Modal } from 'ant-design-vue'
import { computed, ref, toRefs, watch } from 'vue'
import type { IWorkspace } from '@/services/workspace/types'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { Button } from '@/components/button'
import { FileUploader } from '@/components/file-uploader'
import { Input } from '@/components/input'
import { FormItem } from '@/components/form'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const workspaceStore = useWorkspaceStore()
const { moveNextStep, setFormValueImgFile, setNextBtnDisabled } = workspaceStore
const { getFormValues } = toRefs(workspaceStore)

const fileUploader = ref()
const modalVisible = ref(false)
const profileList = ref<IWorkspace.ImageFileInfo[]>([])
const fileUploaderImg = computed(() => fileUploader.value?.getFiles())
const seletedImg = ref('')
const isError = ref(false)
const validText = ref('')

;(async () => {
  try {
    const { data } = await WorkspaceService.getDefaultProfiles()
    const defaultImage = data.images[0]
    profileList.value = data.images
    seletedImg.value = defaultImage.url

    setFormValueImgFile({
      ...defaultImage,
      saveName: defaultImage.name
    })

    if (getFormValues.value.url) {
      seletedImg.value = getFormValues.value.url
    }
  } catch (err) {
    console.log(err)
  }
})()

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
  setNextBtnDisabled(!isValid(value))
}

const onClickImg = (imgValue: IWorkspace.ImageFileInfo) => {
  seletedImg.value = imgValue.url
  modalVisible.value = false

  setFormValueImgFile({
    ...imgValue,
    saveName: imgValue.name
  })
}

watch(fileUploaderImg, (imgfileList) => {
  if (imgfileList.length) {
    const imgValue = imgfileList.at(-1)
    seletedImg.value = imgValue.url

    setFormValueImgFile({
      ...imgValue,
      saveName: imgValue.name
    })
  }
})

watch(
  getFormValues,
  (formValue) => {
    if (formValue.nickname.length) {
      setNextBtnDisabled(false)
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.profile-wrapper {
  margin-top: 2rem;
  .profile-box {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}
.img-wrapper {
  width: 100px;
  img {
    width: 100%;
    border-radius: $radius-round-2;
  }
}
p {
  color: $color-gray-7;
  line-height: 1.4;
  font-size: $font-size-base;
}
.btn-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;

  > span {
    font-size: $font-size-small;
  }
}

:deep(.ant-upload-list) {
  height: auto !important;
}
.profile-img-wrapper {
  position: relative;
  cursor: pointer;

  .img-masking {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(87 86 86 / 40%);
    transition: opacity 0.4s;
    opacity: 0;

    span {
      color: $color-text-10;
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      background: $color-white;
      padding: 5px 10px;
      font-weight: 700;
      border-radius: 1rem;
    }

    &:hover {
      opacity: 1;
    }
  }
}

:deep(.profile-img) {
  width: 130px;
}
:deep(.ant-upload-list) {
  display: none;
}

@include xxs {
  .btn-wrapper {
    flex-direction: row;
    gap: 0.4rem;
  }
}
@include xs {
  .btn-wrapper {
    flex-direction: row;
    gap: 0.4rem;
  }
}
@include sm {
  .btn-wrapper {
    flex-direction: row;
    gap: 0.4rem;
  }
}
@include md {
  .btn-wrapper {
    flex-direction: column;
    gap: 0.4rem;
  }
}
</style>
