<template>
  <div class="selection-popup-container">
    <Alert :message="message" :class="getDarkModeClass">
      <template #action>
        <Button
          size="small"
          :type="'link'"
          :label="$t('component.button.cancel')"
          @click="onCancel"
        />
      </template>
    </Alert>
  </div>
</template>
<script setup lang="ts" name="SelectionPopup">
import { Alert } from 'ant-design-vue'
import { computed } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { Button } from '@/components/button'
import { useTableContext } from '../../hooks/useTableContext'

interface SelectionPopupProps {
  selectedRows: Recordable[]
}

const props = defineProps<SelectionPopupProps>()
const {
  config: { theme }
} = useProjectConfigStore()
const table = useTableContext()
const getDarkModeClass = computed(() => ({ 'dark-mode': theme.navTheme === 'realDark' }))
const roundColor = computed(() => theme.primaryColor)
const message = computed(() => props.selectedRows.length + '개의 행이 선택되었습니다.')

function onCancel() {
  table.setContextValues({ showSelectionPopup: false })
  table.initSelecion()
}
</script>
<style lang="scss" scoped>
.selection-popup-container {
  :deep(.ant-alert) {
    width: 250px;
    top: 45px;
    left: 40%;
    text-align: center;
    line-height: normal;
    font-size: 13px;
    // color: v-bind(roundColor);
    background-color: $color-white;
    border: 1.5px solid v-bind(roundColor);
    font-weight: 500;
    box-shadow: 2px 2px 5px $color-gray-5;
    z-index: 10;
    border-radius: 20px;

    .ant-alert-message {
      color: v-bind(roundColor);
    }

    &.dark-mode {
      background: $color-dark;
      color: $color-white;
      box-shadow: unset;
    }
  }

  .count-text {
    text-align: center;
    line-height: 40px;
    font-size: 13px;
  }
}
</style>
