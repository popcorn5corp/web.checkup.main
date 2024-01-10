<template>
  <div class="timeline-container">
    <Timeline v-if="items" v-bind="{ ...props }">
      <template v-for="(item, idx) in items" :key="idx">
        <TimelineItem>
          <span>{{ item.issuedDate }}</span>

          <template v-for="(log, index) in item.logs" :key="index">
            <p>
              <span>{{ log.createTime }}</span>
              <span> {{ t('page.manage.userName', { userName: log.nickname }) }} </span>
              <span>{{ t(`page.manage.userStatus.${[log.status.value]}`) }}</span>
            </p>
          </template>
        </TimelineItem>
      </template>
    </Timeline>

    <!-- Timeline slot -->
    <Timeline v-else v-bind="{ ...props }"> <slot /> </Timeline>

    <!-- Button handle -->
    <template v-if="showBtn">
      <div style="text-align: center">
        <Button type="primary" :loading="loading" :block="true" @click="onClick">
          <slot v-if="!loading" name="button-text">더 불러오기</slot>
        </Button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts" name="Timeline">
import { Timeline, TimelineItem } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/button'
import type { TimelineProps } from '../types'

const { t } = useI18n()

const props = defineProps<TimelineProps>()
const emit = defineEmits(['click'])

const onClick = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
.timeline-container {
  margin: 1rem;
  span {
    margin-right: 2px;
  }
}
</style>
