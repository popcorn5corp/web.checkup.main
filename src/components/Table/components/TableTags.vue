<script setup lang="ts" name="TableTags">
import { computed } from 'vue';
import { useTag } from '@/hooks/useTag';
import { useProjectConfigStore } from '@/stores/modules/projectConfig';

const { config } = useProjectConfigStore();
const { tags, removeTag } = useTag()
const isRealDarkClass = computed(() => ({ 'tags-dark-mode': config.theme.navTheme === 'realDark' }))

const onClose = (options: LabelValueOptions, type = null) => {
  removeTag(options, type)
}

</script>
<template>
  <div class="table-tags">
    <template v-for="tag in tags">
      <template v-for="{ label, value, type } in tag">
        <p v-if="value !== null" :class="isRealDarkClass">
          <span>{{ label }}</span>
          <span @click="onClose({ label, value }, type)"><font-awesome-icon :icon="['fas', 'xmark']" /></span>
        </p>
      </template>
    </template>
  </div>
</template>
<style lang="scss">
.table-tags {
  display: flex;
  flex-wrap: wrap;

  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 38px;
    margin: 2px;
    background: rgb(0 0 0 / 3%);
    color: #000000;
    padding: 5px 16px;
    margin-bottom: 6px;
    border-color: rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    font-weight: 500;
    font-size: 14px;
    gap: 14px;

    :nth-child(2) {
      cursor: pointer;
    }
  }

  .tags-dark-mode {
    background: transparent !important;
    color: white !important;
    border: 1px solid #666666 !important;
  }
}
</style>