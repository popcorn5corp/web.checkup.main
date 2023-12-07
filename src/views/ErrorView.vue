<template>
  <div class="error-page">
    <Result status="404" title="404" sub-title="This is an NotFound page" size="large">
      <template #extra>
        <Button
          type="primary"
          :label="$t('component.button.toMain')"
          size="large"
          @click="$router.push({ name: 'root' })"
        />
      </template>
    </Result>
  </div>
</template>
<script setup lang="ts" name="ErrorView">
import { Result } from 'ant-design-vue'
</script>

<style>
.error-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .ant-result-title {
    font-size: 26px !important;
  }
  .ant-result-subtitle {
    font-size: 24px !important;
  }
}
</style>
