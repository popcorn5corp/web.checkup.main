<template>
  <div class="table-layout-form-container">
    <slot></slot>

    <div class="detail-wrapper" v-if="openDetail" :style="{ width: openDetail ? '25%' : '' }">
      <div class="title">
        <span> 상세 영역 </span>
        <Button :size="'small'" @click="$emit('update:openDetail', false)">
          <template #icon>
            <font-awesome-icon class="xmark" :icon="['fas', 'xmark']" />
          </template>
        </Button>
      </div>

      <Divider />

      <slot name="detail-content"></slot>
    </div>
  </div>
</template>
<script setup lang="ts" name="TableLayoutForm">
import { Divider } from 'ant-design-vue'
import { computed, ref, useSlots, watch } from 'vue'

interface TableLayoutFormProps {
  openDetail: boolean
}

const emit = defineEmits(['update:openDetail'])
const props = defineProps<TableLayoutFormProps>()

const styles = computed(() => {
  const { openDetail } = props
  console.log('openDetail :: ', openDetail)

  return {
    tableContentWidth: openDetail ? '75%' : '',
    filterFormWidth: openDetail ? '25%' : ''
  }
})

// watch(
//   () => useSlots().default()[0].ctx.setupState.dynamicTableRef,
//   (ref) => {
//     console.log('watch :: ', ref)
//   },
//   {
//     immediate: true,
//     deep: true
//   }
// )

// @ts-ignore
console.log('slots :: ', useSlots().default()[0].ctx.setupState.dynamicTableRef)
console.log('props :: ', props)
</script>
<style lang="scss" scoped>
.table-layout-form-container {
  // display: flex;
  // height: 100%;
  // position: relative;

  :deep(.dynamic-table-containter) {
    // display: flex;
    // // height: 100%;
    // position: relative;
    // flex: 1;
    // position: relative;

    .body {
      .content {
        // width: v-bind('styles.tableContentWidth') !important;
      }

      // :deep(.filter-form-container) {
      //   width: v-bind('styles.filterFormWidth');
      // }
    }
  }

  .detail-wrapper {
    flex: 2;
    background-color: $color-white;
    // height: 100%;
    position: absolute;
    width: 500px;
    z-index: 2;
    right: 0;
    height: 100%;
    margin-right: -15px;
    margin-top: -15px;

    border: 0.5px solid $color-gray-4;

    > .title {
      display: flex;
      font-size: 16px;
      font-weight: bold;
      justify-content: space-between;
      padding: 18.5px;
      align-items: end;
    }

    :deep(.ant-divider) {
      margin: 0;
    }
  }
}
</style>
