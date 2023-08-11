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
      @change="onChange"
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
import { message } from 'ant-design-vue'
import type { UploadProgressEvent } from 'ant-design-vue/es/vc-upload/interface'
import { ref, watch } from 'vue'
import type { IFileManager } from '@/services/FileManager/interface'
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
const newFileList = ref<FileUploaderProps['files']>([])
// const newFileList = ref<UploadProps['fileList']>([])

watch(
  () => props.files,
  (_files) => {
    fileList.value = _files.map((file) => {
      return {
        uid: file.fileId,
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

  // // For Multiple FormData
  // const formData = new FormData()
  // newFileList.value!.forEach((_file, i) => {
  //   formData.append(`files[${i}].file`, _file as any)
  //   formData.append(`files[${i}].type`, props.type)
  // })

  const formData = new FormData()
  formData.append('files[0].file', file as any)
  formData.append('files[0].type', props.type)

  try {
    const { data, success } = await FileManagerService.upload(formData, {})
    if (success) {
      message.success('upload successfully.')
      const { files } = data

      fileList.value?.push({
        uid: files[0].fileId,
        name: files[0].fileOriginName,
        status: 'done'
      })

      newFileList.value = [...(newFileList.value || []), files[0]]
    } else {
      message.error('upload failed.')
    }
  } catch (e) {
    console.log(e)
    message.error('upload failed.')
  }
}

const onDownload: UploadProps['onDownload'] = (file) => {
  console.log('onDownload :: ', file)
}

const onChange: UploadProps['onChange'] = (info) => {}

const onRemove: UploadProps['onRemove'] = (file) => {
  fileList.value = fileList.value?.filter((_file) => _file.uid !== file.uid)
}

const onBeforeUpload: UploadProps['beforeUpload'] = (file) => {
  // newFileList.value = [...(newFileList.value || []), file]
}

const getFiles = () => {
  return props.files.concat(newFileList.value)
}

defineExpose({
  getFiles
})
</script>

<style lang="scss" scoped>
.file-uplaod-wrapper {
}
</style>
