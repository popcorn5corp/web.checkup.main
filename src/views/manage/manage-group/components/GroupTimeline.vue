<template>
  <div class="group-history-container">
    <Timeline :items="items" :pagination="true" :loading="loading" @reload="fetchGroupHistory">
      <template #button-text>
        {{ t('page.manage.moreContent') }}
      </template>
    </Timeline>
  </div>
</template>

<script setup lang="ts" name="GroupHistory">
import { ManagerGroupService } from '@/services'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Timeline } from '@/components/timeline'

const { t } = useI18n()
const items = ref()

type Props = { groupId: string }

const props = defineProps<Props>()

const size = ref(0)
const loading = ref(false)

const handleLoading = () => {
  loading.value = !loading.value
}

watch(
  props,
  () => {
    fetchGroupHistory()
  },
  { immediate: true }
)

function fetchGroupHistory() {
  handleLoading()

  size.value += 5
  ManagerGroupService.getGroupHistory(props.groupId, { size: size.value })
    .then(
      ({
        success,
        data: {
          posts: { content }
        }
      }) => {
        if (success) {
          items.value = content
        }
      }
    )
    .catch((err) => console.log(err))
    .finally(() => handleLoading())
}
</script>

<style lang="scss" scoped>
.group-history-container {
  // padding: 1rem 1.6rem;
  display: flex;
  flex-direction: column;

  :deep(.ant-divider) {
    margin-bottom: 10px !important;
  }
}
</style>
