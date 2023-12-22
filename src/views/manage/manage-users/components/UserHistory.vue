<template>
  <div class="user-history-container">
    <a-timeline :pending="loading && '잠시만 기다려주세요...'">
      <template v-for="{ issuedDate, logs } in groupLogs" :key="issuedDate">
        <a-timeline-item>
          <span>{{ issuedDate }}</span>
          <template v-for="(log, index) in logs" :key="index">
            <p>
              <span style="margin-right: 3px">{{ log.createTime }}</span>
              <span
                ><b>{{ log.nickname }}</b
                >님이
              </span>
              <span>{{ log.status.label }} 되었습니다.</span>
            </p>
          </template>
        </a-timeline-item>
      </template>
    </a-timeline>

    <a-button type="primary" style="margin-top: 16px" @click="fetchGroupHistory"
      >더 불러오기</a-button
    >
  </div>
</template>

<script setup lang="ts" name="ComponentsOverviewList">
import { ManagerGroupService } from '@/services'
import { ref, watch, withDefaults } from 'vue'

const groupLogs = ref()

type Props = { groupId: string }

const props = withDefaults(defineProps<Props>(), {
  groupId: '79adc938-1512-4afd-a6d5-e8eb22590bae'
})
const size = ref(0)
const loading = ref(false)

watch(
  props,
  (groupId) => {
    console.log('groupId >>> ', groupId)

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
        groupLogs.value = content
        console.log(content)
      }

      loading.value = false
    }
  )
}
</script>

<style lang="scss" scoped>
.user-history-container {
  padding: 1rem 1.6rem;
  display: flex;
  flex-direction: column;
}
</style>
