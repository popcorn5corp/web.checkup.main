<template>
  <div class="menu-header">
    <Button
      type="primary"
      :label="!collapsed ? $t('layout.menu.newWorkspace') : ''"
      :style="buttonStyle"
    >
      <template #icon>
        <PlusCircleFilled />
      </template>
    </Button>
  </div>
</template>
<script setup lang="ts">
import { type CSSProperties, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/button'
import { PlusCircleFilled } from '@/components/icons'

defineOptions({
  name: 'MenuHeader'
})

interface Props {
  collapsed: boolean
}

const props = defineProps<Props>()
const { t } = useI18n()
const buttonStyle = computed<CSSProperties>(() => {
  return {
    width: !props.collapsed ? '180px' : '50px'
  }
})
</script>
<style lang="scss" scoped>
.menu-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
</style>
