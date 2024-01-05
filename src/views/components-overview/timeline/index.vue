<template>
  <div>
    <Timeline :pagination="pagination" :loading="loading" :items="items">
      <template #items="{ item }">
        {{ item }}
        <!-- <template #date>{{ item.issuedDate }}</template> -->
        <!-- <template #time>{{ item.createTime }}</template> -->
        <!-- <template #content>
          <span> {{ t('page.manage.userName', { userName: log.nickname }) }} </span>
          <span>{{ t(`page.manage.userStatus.${[log.status.value]}`) }}</span>
        </template> -->
      </template>
      <template #button-text>
        {{ t('page.manage.moreContent') }}
      </template>
    </Timeline>
  </div>
</template>

<script setup lang="ts" name="ComponentsOverviewTimeline">
import { ManagerGroupService } from '@/services'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/button'
import { Timeline } from '@/components/timeline'

const { t } = useI18n()
const groupLogs = ref()

type Props = { groupId: string }

const props = defineProps<Props>()

const loading = ref(false)
const pagination = ref(true)

const size = ref(0)

const items = [
  {
    issuedDate: '2024-01-02',
    logs: [
      {
        logId: 'a35cf87f-8b03-4f63-bed0-02f64b891c43',
        status: {
          label: '가입',
          value: 'JOIN'
        },
        uid: 'faad2d48-5297-4980-8529-81f2b86d1af1',
        nickname: 'ZIP',
        createTime: '18:09'
      },
      {
        logId: '791ed4b5-4918-47b2-b3e0-6230401256b6',
        status: {
          label: '생성',
          value: 'CREATE'
        },
        uid: 'faad2d48-5297-4980-8529-81f2b86d1af1',
        nickname: 'ZIP',
        createTime: '18:09'
      }
    ]
  }
]

const handleLoading = () => {
  loading.value = !loading.value
}
</script>

<style lang="scss" scoped>
.group-history-container {
  padding: 1rem 1.6rem;
  display: flex;
  flex-direction: column;

  :deep(.ant-divider) {
    margin-bottom: 10px !important;
  }
}
</style>
