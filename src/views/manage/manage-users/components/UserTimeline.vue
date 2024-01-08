<template>
  <div class="group-history-container">
    <Timeline :items="items" :pagination="true" :loading="loading" @reload="fetchGroupHistory">
      <template #button-text>
        {{ t('page.manage.moreContent') }}
      </template>
    </Timeline>
  </div>
</template>

<script setup lang="ts" name="UserHistory">
import { ManagerGroupService } from '@/services'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Timeline } from '@/components/timeline'

const { t } = useI18n()
const items = ref()

type Props = { groupId: string }

const props = withDefaults(defineProps<Props>(), {
  groupId: '79adc938-1512-4afd-a6d5-e8eb22590bae'
})
const size = ref(0)
const loading = ref(false)

watch(
  props,
  () => {
    fetchGroupHistory()
  },
  { immediate: true }
)

function fetchGroupHistory() {
  loading.value = true

  size.value += 5
  ManagerGroupService.getGroupHistory(props.groupId, { size: size.value }).then(
    ({
      success,
      data: {
        posts: { content }
      }
    }) => {
      if (success) {
        items.value = content
      }

      loading.value = false
    }
  )
}
</script>

<style lang="scss" scoped>
.group-history-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;

  :deep(.ant-divider) {
    margin-bottom: 10px !important;
  }
}
</style>
