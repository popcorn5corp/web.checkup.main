<template>
  <div class="file-uplaod-wrapper">
    <Upload> </Upload>
  </div>
</template>
<script setup lang="ts" name="FileUploader">
import { Upload, type UploadProps } from 'ant-design-vue'
import { ref } from 'vue'

const files = ref([])
</script>

<style lang="scss" scoped>
.file-uplaod-wrapper {
}
</style>
