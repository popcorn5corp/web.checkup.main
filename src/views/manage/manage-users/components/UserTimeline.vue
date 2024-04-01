<template>
  <div class="user-history-container">
    <template v-if="items.length">
      <Timeline :items="items" :showBtn="showBtn" :loading="loading" @click="fetchUserHistory" />
    </template>
    <template v-else>
      <Empty>
        <template #description>
          <span>이력이 없습니다.</span>
        </template>
      </Empty>
    </template>
  </div>
</template>

<script setup lang="ts" name="UserHistory">
import { ManageUserService } from '@/services'
import { Empty } from 'ant-design-vue'
import { ref, watch } from 'vue'

import { Timeline } from '@/components/timeline'

const items = ref()

type Props = { workspaceId: string; workspaceUserId: string }

const props = withDefaults(defineProps<Props>(), {})
const page = ref(0)
const size = ref(5)
const loading = ref(false)
const showBtn = ref(false)

const handleLoading = () => {
  loading.value = !loading.value
}

const initState = () => {
  items.value = []
  size.value = 5
  page.value = 0
}

watch(
  props,
  () => {
    if ((props.workspaceId, props.workspaceUserId)) {
      initState()

      fetchUserHistory()
    }
  },
  { immediate: true, deep: true }
)

function fetchUserHistory() {
  handleLoading()

  ManageUserService.getUserTimeline(props.workspaceId, props.workspaceUserId, {
    page: page.value,
    size: size.value
  })
    .then(({ success, data }) => {
      if (success) {
        showBtn.value = false

        if (data.posts.content.length) {
          items.value.push(...data.posts.content)

          showBtn.value = true
          page.value += 1
        }
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
