<template>
  <div class="user-history-container">
    <Timeline :items="items" :showBtn="true" :loading="loading" @click="fetchUserHistory" />
  </div>
</template>

<script setup lang="ts" name="UserHistory">
import { ManageUserService } from '@/services'
import { ref, watch } from 'vue'

import { Timeline } from '@/components/timeline'

const items = ref()

type Props = { workspaceId: string; workspaceUserId: string }

const props = withDefaults(defineProps<Props>(), {})
const page = ref(0)
const size = ref(0)
const loading = ref(false)

const handleLoading = () => {
  loading.value = !loading.value
}

watch(
  props,
  () => {
    fetchUserHistory()
  },
  { immediate: true }
)

function fetchUserHistory() {
  handleLoading()

  ManageUserService.getUserTimeline(props.workspaceId, props.workspaceUserId, {
    size: size.value
  })
    .then(({ success, data }) => {
      if (success) {
        items.value = data.posts.content

        size.value += 5
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
.user-history-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;

  :deep(.ant-divider) {
    margin-bottom: 10px !important;
  }
}
</style>
