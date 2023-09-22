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
        showDownloadIcon: showDownload,
        showRemoveIcon: !readonly || showRemove,
        showPreviewIcon: showPreview
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
import { Upload } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { saveAs } from 'file-saver'
import { ref, watch } from 'vue'
import { Button } from '@/components/button'
import { UploadOutlined } from '@/components/icons'
import type {
  FileUploaderEmits,
  FileUploaderProps,
  RcFile,
  UpdateFileContent,
  UploadFile,
  UploadProgressEvent,
  UploadProps
} from '../types'

defineEmits<FileUploaderEmits>()
const props = withDefaults(defineProps<FileUploaderProps>(), {
  files: () => [],
  readonly: false,
  type: 'TEST',
  showDownload: true,
  showRemove: false,
  showPreview: true
})

const IMG_SERVER_URL: Readonly<string> = 'https://sawork-prod.s3.ap-northeast-2.amazonaws.com/'
const fileList = ref<UploadFile[]>([]) // for upload component binding
const newFileList = ref<UpdateFileContent[]>([]) // for file contents update

watch(
  () => props.files,
  (_files) => {
    fileList.value = _files.map((file) => {
      return {
        uid: file.fileId as string,
        name: file.originName,
        url: file.url,
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
  formData.append('files[0].file', file)
  formData.append('files[0].type', props.type)

  try {
    const { data, success } = await FileManagerService.upload(formData, {})
    if (success) {
      message.success('upload successfully.')
      const { files } = data
      const responseFile = files[0]

      fileList.value?.push({
        uid: (file as RcFile).uid,
        name: responseFile.originName,
        url: responseFile.url,
        status: 'done'
      })

      // 업데이트 가능한 File 형식에 맞도록 Response File 기준으로 세팅
      newFileList.value = [
        ...(newFileList.value || []),
        {
          ...responseFile,
          remove: false
        }
      ]
    } else {
      message.error('upload failed.')
    }
  } catch (e) {
    console.log(e)
    message.error('upload failed.')
  }
}

// TODO
const onDownload: UploadProps['onDownload'] = (file) => {
  const { name, url } = file

  FileManagerService.download({
    fileName: name,
    fileUrl: url?.replace(IMG_SERVER_URL, '') as string
  }).then((blob) => {
    saveAs(blob, file.name)
  })
}

const onChange: UploadProps['onChange'] = (info) => {}

const onRemove: UploadProps['onRemove'] = (file) => {
  fileList.value = fileList.value?.filter((_file) => _file.uid !== file.uid)
}

const onBeforeUpload: UploadProps['beforeUpload'] = (file) => {
  // newFileList.value = [...(newFileList.value || []), file]
}

const getFiles = () => {
  // fileList에 존재하는 props files 목록만 필터
  const filterdPropFiles: UpdateFileContent[] = props.files.map((propFile) => {
    const file = fileList.value?.find((f) => f.uid === propFile.fileId)

    return {
      ...propFile,
      remove: !file
    }
  })

  return filterdPropFiles.concat(newFileList.value)
}

defineExpose({
  getFiles
})
</script>

<style lang="scss" scoped>
.file-uplaod-wrapper {
  :deep(.ant-upload-list) {
    height: 200px;
    overflow-y: auto;

    .ant-upload-list-item-actions {
      width: 55px;
    }
  }
}
</style>
