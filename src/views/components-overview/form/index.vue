<template>
  <div class="components-overview-form-container">
    <LoginForm />

    <ContentForm />
  </div>
</template>

<script lang="ts" setup name="ComponentsOverviewForm">
import ContentForm from './components/ContentForm.vue'
import LoginForm from './components/LoginForm.vue'
</script>

<style scoped lang="scss">
.components-overview-form-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  padding: 16px;
}
</style>
