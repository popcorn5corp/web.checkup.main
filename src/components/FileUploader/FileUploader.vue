<template>
  <div class="file-uplaod-wrapper">
    <Upload
      class="file-uploader"
      :file-list="fileList"
      action="noaction"
      :list-type="'picture'"
      :multiple="true"
      :custom-request="onUpload"
      :before-upload="onBeforeUpload"
      :show-upload-list="{
        showDownloadIcon: true,
        showRemoveIcon: !readonly,
        showPreviewIcon: true
      }"
      @download="onDownload"
      @remove="onRemove"
    >
      <Button v-if="!readonly" label="Upload">
        <template #icon>
          <UploadOutlined />
        </template>
      </Button>
    </Upload>
  </div>
</template>
<script setup lang="ts" name="FileUploader">
import { FileManagerService } from '@/services'
import { Upload, type UploadFile, type UploadProps } from 'ant-design-vue'
import { ref, watch } from 'vue'
import type { IFileManager } from '@/services/Upload/interface'
import { Button } from '@/components/Button'
import { UploadOutlined } from '@/components/Icon'

interface FileUploaderProps {
  files: IFileManager.FileContent[] // File List
  type?: IFileManager.FileType
  readonly?: boolean // Only Read Mode
}

interface FileUploaderEmits {
  (event: 'change'): void
  (event: 'remove'): void
}

const emits = defineEmits<FileUploaderEmits>()
const props = withDefaults(defineProps<FileUploaderProps>(), {
  files: () => [],
  readonly: false,
  type: 'TEST'
})

const fileList = ref<UploadProps['fileList']>([])
const newFileList = ref<UploadProps['fileList']>([])

watch(
  () => props.files,
  (_files) => {
    fileList.value = _files.map((file) => {
      return {
        uid: file.uid,
        name: file.fileOriginName,
        status: 'done'
      }
    })
  },
  {
    immediate: true
  }
)

const onUpload: UploadProps['customRequest'] = async (options) => {
  const { onSuccess, onError, file, onProgress } = options

  console.log('fileList ', newFileList.value)
  console.log('file ', file)

  const formData = new FormData()
  newFileList.value!.forEach((_file, i) => {
    formData.append(`files[${i}].file`, _file as any)
    formData.append(`files[${i}].type`, props.type)
  })

  const result = await FileManagerService.upload(formData)
  console.log('result :: ', result)
}

const onDownload: UploadProps['onDownload'] = (file) => {
  console.log('onDownload :: ', file)
}

const onRemove: UploadProps['onRemove'] = (file) => {}

const onBeforeUpload: UploadProps['beforeUpload'] = (file) => {
  newFileList.value = [...(newFileList.value || []), file]
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   message.error('Image must smaller than 2MB!');
  // }
  // return isJpgOrPng && isLt2M;

  // fileList.value = [...(fileList.value || []), file]
}
</script>

<style lang="scss" scoped>
.file-uplaod-wrapper {
}
</style>
