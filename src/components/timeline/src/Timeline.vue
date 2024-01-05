<template>
  <div class="timeline-container">
    <Timeline>
      <template v-if="items && items.length">
        <template v-for="(item, itemIdx) in items" :key="itemIdx">
          <slot name="items" :item="{ item }">
            <Timeline.Item>
              <span><slot name="date" /></span>

              <template v-for="(log, index) in item.logs" :key="index">
                <p>
                  <span style="margin-right: 3px"> <slot name="time" /> </span>

                  <slot name="content" />
                </p>
              </template>
            </Timeline.Item>
          </slot>
        </template>
      </template>

      <slot v-else />
    </Timeline>

    <template v-if="pagination">
      <Button type="primary" :loading="loading" @click="reload">
        <slot name="button-text" />
      </Button>
    </template>
  </div>
</template>

<script setup lang="ts" name="Timeline">
import { Timeline, TimelineItem } from 'ant-design-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/button'
import type { TimelineProps } from '../types'

const { t } = useI18n()
const groupLogs = ref()

const emit = defineEmits(['reload'])

const props = defineProps<TimelineProps>()

const reload = () => {
  emit('reload')
}
</script>

<style lang="scss" scoped>
.timeline-container {
  padding: 1rem 1.6rem;
  display: flex;
  flex-direction: column;

  :deep(.ant-divider) {
    margin-bottom: 10px !important;
  }
}
</style>
