<template>
  <Modal
    centered
    width="770px"
    :open="props.modalVisible"
    :title="$t('component.button.selectImg')"
    :footer="false"
    @cancel="emit('cancel')"
  >
    <template #body>
      <div class="profile-select-body">
        <div v-if="!isLoading" v-for="profileImg in profileList" :key="profileImg.url">
          <div class="profile-img-wrapper">
            <img :src="profileImg.url" alt="출처 Freepik" class="profile-img" />
            <div class="img-masking" @click="onClickImg(profileImg)">
              <span>{{ $t('common.select') }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup name="ProfileSelectModal">
import { WorkspaceService } from '@/services'
import { ref } from 'vue'

import type { IWorkspace } from '@/services/workspace/types'

import { useWorkspaceStore } from '@/stores/modules/workspace'

import { Modal } from '@/components/modal'

interface Props {
  modalVisible?: boolean
  selectImg?: string
  cancel?: () => void
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['cancel', 'update:selectImg'])

const workspaceStore = useWorkspaceStore()
const { setFormValueImgFile } = workspaceStore

const profileList = ref<IWorkspace.ImageFileInfo[]>([])
const isLoading = ref(false)

;(async () => {
  try {
    isLoading.value = true

    const { data } = await WorkspaceService.getDefaultProfiles()
    const defaultImage = data.images[0]
    profileList.value = data.images

    if (!props.selectImg) {
      emit('update:selectImg', defaultImage.url)
    }

    setFormValueImgFile({
      ...defaultImage,
      saveName: defaultImage.name
    })
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
})()

const onClickImg = (imgValue: IWorkspace.ImageFileInfo) => {
  emit('update:selectImg', imgValue.url)
  emit('cancel')

  setFormValueImgFile({
    ...imgValue,
    saveName: imgValue.name
  })
}
</script>

<style lang="scss" scoped>
.profile-select-body {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
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
  .profile-img {
    width: 130px;
  }
}
</style>
