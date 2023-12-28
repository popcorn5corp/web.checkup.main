<template>
  <div class="group-history-container">
    <a-timeline :pending="loading && t('common.loading')">
      <template v-for="{ issuedDate, logs } in groupLogs" :key="issuedDate">
        <a-timeline-item>
          <a-divider orientation="left">{{ issuedDate }}</a-divider>
          <template v-for="(log, index) in logs" :key="index">
            <p>
              <span style="margin-right: 3px">{{ log.createTime }}</span>
              <span> {{ t('page.manage.userName', { userName: log.nickname }) }} </span>
              <span>{{ t(`page.manage.userStatus.${[log.status.value]}`) }}</span>
            </p>
          </template>
        </a-timeline-item>
      </template>
    </a-timeline>

    <Button v-if="!loading" type="primary" @click="fetchGroupHistory">{{
      t('page.manage.moreContent')
    }}</Button>
  </div>
</template>

<script setup lang="ts" name="UserHistory">
import { ManagerGroupService } from '@/services'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/button'

const { t } = useI18n()
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
