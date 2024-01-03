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

<script setup lang="ts" name="GroupHistory">
import { ManagerGroupService } from '@/services'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/button'

const { t } = useI18n()
const groupLogs = ref()

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
          groupLogs.value = content
        }
      }
    )
    .catch((err) => console.log(err))
    .finally(() => handleLoading())
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
