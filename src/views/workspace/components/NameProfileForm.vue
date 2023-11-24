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
    <div v-for="img in images" :key="img">
      <div class="profile-img-wrapper">
        <img :src="img" alt="출처 Freepik" class="profile-img" />
        <div class="img-masking" @click="onClickImg(img)">
          <span>{{ $t('common.select') }}</span>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup name="NameProfileForm">
import img1 from '@/assets/images/avatar/avatar1.jpg'
import img2 from '@/assets/images/avatar/avatar2.jpg'
import img3 from '@/assets/images/avatar/avatar3.jpg'
import img4 from '@/assets/images/avatar/avatar4.jpg'
import img5 from '@/assets/images/avatar/avatar5.jpg'
import img6 from '@/assets/images/avatar/avatar6.jpg'
import img7 from '@/assets/images/avatar/avatar7.jpg'
import img8 from '@/assets/images/avatar/avatar8.jpg'
import img9 from '@/assets/images/avatar/avatar9.jpg'
import img10 from '@/assets/images/avatar/avatar10.jpg'
import { Input, Modal } from 'ant-design-vue'
import { computed, ref, toRefs, watch } from 'vue'
import { useWorkspaceStore } from '@/stores/modules/workspace'
import { Button } from '@/components/button'
import { FileUploader } from '@/components/file-uploader'

const workspaceStore = useWorkspaceStore()
const { getFormValues } = toRefs(workspaceStore)

const fileUploader = ref()
const modalVisible = ref(false)
const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
const fileUploaderImg = computed(() => fileUploader.value?.getFiles())
const seletedImg = ref(img1)

;(async () => {
  if (getFormValues.value.path) {
    seletedImg.value =
      'https://sawork-prod.s3.ap-northeast-2.amazonaws.com' + getFormValues.value.path
  }
})()

const onInput = (e: Event) => {
  const nameValue = (e.target as HTMLInputElement).value
  workspaceStore.setNextBtnDisabled(nameValue.length > 0 ? false : true)
}

const onClickImg = (e: any) => {
  seletedImg.value = e
  modalVisible.value = false
  // TODO 서버에서 기본이미지 리스트 내려주면 수정
  // workspaceStore.setFormValueImgFile({
  //   originName: imgValue.originName,
  //   saveName: imgValue.name,
  //   path: imgValue.path,
  //   size: imgValue.size,
  //   ext: imgValue.ext
  // })
}

watch(fileUploaderImg, (imgfileList) => {
  if (imgfileList.length) {
    const imgValue = imgfileList.at(-1)
    seletedImg.value = imgValue.url
    workspaceStore.setFormValueImgFile({
      originName: imgValue.originName,
      saveName: imgValue.name,
      path: imgValue.path,
      size: imgValue.size,
      ext: imgValue.ext
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
  color: #888;
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
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      background: #fff;
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
