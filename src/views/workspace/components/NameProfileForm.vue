<template>
  <div class="text-wrapper">
    <h1>{{ $t('common.inputName') }}</h1>
    <p>
      {{ $t('page.workspace.nameProfileDesc') }}
    </p>
  </div>
  <div class="form-wrapper">
    <Input
      :placeholder="$t('common.inputName')"
      v-model:value="getFormValues.nickname"
      :maxlength="50"
      @input="onInput"
    />
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
              :label="$t('page.workspace.selectImgBtn')"
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
    :title="$t('page.workspace.selectImg')"
    width="64%"
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
import { Input, Modal } from 'ant-design-vue'
import { computed, ref, toRefs, watch } from 'vue'
import type { IWorkspace } from '@/services/workspace/interface'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { Button } from '@/components/button'
import { FileUploader } from '@/components/file-uploader'

const workspaceStore = useWorkspaceStore()
const { getFormValues } = toRefs(workspaceStore)

const fileUploader = ref()
const modalVisible = ref(false)
const profileList = ref<IWorkspace.ImageFilesInfo[]>([])
const fileUploaderImg = computed(() => fileUploader.value?.getFiles())
const seletedImg = ref('')

;(async () => {
  try {
    const { data } = await WorkspaceService.getDefaultProfiles()
    const defaultImage = data.images[0]
    profileList.value = data.images
    seletedImg.value = defaultImage.url

    workspaceStore.setFormValueImgFile({
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

const onInput = (e: Event) => {
  const nameValue = (e.target as HTMLInputElement).value
  workspaceStore.setNextBtnDisabled(nameValue.length > 0 ? false : true)
}

const onClickImg = (imgValue: IWorkspace.ImageFilesInfo) => {
  seletedImg.value = imgValue.url
  modalVisible.value = false

  workspaceStore.setFormValueImgFile({
    ...imgValue,
    saveName: imgValue.name
  })
}

watch(fileUploaderImg, (imgfileList) => {
  if (imgfileList.length) {
    const imgValue = imgfileList.at(-1)
    seletedImg.value = imgValue.url
    workspaceStore.setFormValueImgFile({
      ...imgValue,
      saveName: imgValue.name
    })
  }
})

watch(
  getFormValues,
  (formValue) => {
    if (formValue.nickname.length) {
      workspaceStore.setNextBtnDisabled(false)
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
  width: 150px;
  img {
    width: 100%;
  }
}
p {
  color: $sub-text-dark-gray-color;
  line-height: 1.4;
  font-size: 17px;
}
.btn-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  font-size: 15px;
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
      color: $color-black;
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      background: $color-white;
      padding: 5px 10px;
      font-weight: 700;
      border-radius: 1rem;
    }
  }
}
.profile-img-wrapper:hover {
  .img-masking {
    opacity: 1;
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
