<template>
  <div class="group-history-container">
    <Timeline :items="items" :showBtn="true" :loading="loading" @click="fetchGroupHistory" />
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
    .then(({ success, data }) => {
      if (success) {
        items.value = data.posts.content
      }
    })
    .catch((err) => console.log(err))
    .finally(() =>
      setTimeout(() => {
        handleLoading()
      }, 300)
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
