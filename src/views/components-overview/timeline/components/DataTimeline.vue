<template>
  <div>
    <Timeline :items="items" :pagination="pagination" :loading="loading" @reload="onReload">
      <template #button-text>
        {{ t('page.manage.moreContent') }}
      </template>
    </Timeline>
  </div>
</template>

<script setup lang="ts" name="ComponentsOverviewTimeline">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Timeline } from '@/components/timeline'

const { t } = useI18n()

const loading = ref(false)
const pagination = ref(true)

const handleLoading = (val: boolean) => {
  loading.value = val
}

const onReload = () => {
  handleLoading(true)

  setTimeout(() => {
    handleLoading(false)
  }, 500)
}

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
        nickname: '김길동',
        createTime: '18:09'
      },
      {
        logId: '791ed4b5-4918-47b2-b3e0-6230401256b6',
        status: {
          label: '생성',
          value: 'CREATE'
        },
        uid: 'faad2d48-5297-4980-8529-81f2b86d1af1',
        nickname: '이길동',
        createTime: '18:09'
      }
    ]
  },
  {
    issuedDate: '2024-01-05',
    logs: [
      {
        logId: 'a35cf87f-8b03-4f63-bed0-02f64b891c43',
        status: {
          label: '가입',
          value: 'JOIN'
        },
        uid: 'faad2d48-5297-4980-8529-81f2b86d1af1',
        nickname: '박길동',
        createTime: '18:09'
      },
      {
        logId: '791ed4b5-4918-47b2-b3e0-6230401256b6',
        status: {
          label: '생성',
          value: 'CREATE'
        },
        uid: 'faad2d48-5297-4980-8529-81f2b86d1af1',
        nickname: '홍길동',
        createTime: '18:09'
      }
    ]
  }
]
</script>
