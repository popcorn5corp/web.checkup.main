<template>
  <div class="file-uplaod-wrapper">
    <Upload> </Upload>
  </div>
</template>
<script setup lang="ts" name="FileUploader">
import { ref } from 'vue'
import { Upload, type UploadProps } from 'ant-design-vue'

const files = ref([])
</script>

<style lang="scss" scoped>
.file-uplaod-wrapper {
}
</style>
