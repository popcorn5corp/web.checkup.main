<template>
  <div class="user-profile-container">
    <Dropdown :trigger="['click']" placement="bottomLeft">
      <a class="ant-dropdown-link" @click.prevent>
        <EditOutlined style="font-size: 18px" />
        {{ $t('component.button.edit') }}
      </a>
      <template #overlay>
        <Menu>
          <MenuItem key="1" @click="isProfileImgOpen = true">
            <span>{{ $t('component.button.selectImgBtn') }}</span>
          </MenuItem>
          <MenuItem key="2">
            <FileUploader
              ref="fileUploader"
              :showUploadList="false"
              :useButton="false"
              :btnLabel="$t('component.button.uploadFile')"
            />
          </MenuItem>
        </Menu>
      </template>
    </Dropdown>
    <div class="img-wrapper">
      <img :src="props.url" />
    </div>
  </div>

  <ProfileSelectModal
    v-model:selectImg="selectImg"
    :modalVisible="isProfileImgOpen"
    @cancel="isProfileImgOpen = false"
  />
</template>

<script setup lang="ts" name="UserProfile">
import { Dropdown, Menu, MenuItem } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { watch } from 'vue'

import ProfileSelectModal from '@/views/workspace/components/ProfileSelectModal.vue'

import { FileUploader } from '@/components/file-uploader'
import { EditOutlined } from '@/components/icons'

interface Props {
  url?: string
}
const props = defineProps<Props>()
const emit = defineEmits(['update:url'])

const fileUploader = ref()
const fileUploaderImg = computed(() => fileUploader.value?.getFiles())
const selectImg = ref()
const isProfileImgOpen = ref(false)

watch(
  () => props.url,
  (url) => {
    url && (selectImg.value = url)
  },
  { immediate: true }
)

watch(
  () => selectImg.value,
  (selectImg) => {
    if (selectImg) emit('update:url', selectImg)
  },
  { immediate: true }
)

watch(
  fileUploaderImg,
  (imgfileList) => {
    if (imgfileList.length) {
      const imgValue = imgfileList.at(-1)
      emit('update:url', imgValue.url)
    }
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
$img-size: 160px;

.user-profile-container {
  position: relative;
  width: fit-content;
  margin: 0 auto;

  .img-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $img-size;
    height: $img-size;
    border: 1px solid $color-gray-5;
    overflow: hidden;
    border-radius: 50%;
    > img {
      width: 100%;
      border-radius: 10px;
    }
  }
  .ant-dropdown-link {
    position: absolute;
    bottom: 10px;
    right: 0;
    display: flex;
    align-items: center;
    gap: 2px;
    background: $color-white;
    padding: 3px 5px;
    border-radius: 5px;
    border: 1px solid;
    z-index: 2;
  }
}
</style>
