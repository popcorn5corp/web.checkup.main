<template>
  <div class="card-list-container">
    <div v-for="item in props.items" :key="item.key">
      <Card
        ref="cardRefs"
        v-bind="{ ...item, ...props, ...$attrs }"
        :item="item"
        :imgUrl="item.thumbnail?.url"
        @click="$emit('click', item)"
        @checked="onCheckedItem"
        :title="item.title"
        :tag="item.tag"
        :content="item.content"
        :date="item.date"
      />
    </div>
  </div>
</template>

<script lang="ts" setup name="CardList">
import { computed, ref, unref, watch } from 'vue'
import type { CardListProps } from '../types'
import Card from './Card.vue'

const emit = defineEmits(['click', 'checked', 'select-rows'])
const props = withDefaults(defineProps<CardListProps>(), {
  size: 'middle',
  imgPreview: true
})

const cardRefs = ref<Array<InstanceType<typeof Card>>>()
const selectedRows = ref<Recordable[]>([])
const selectedRowKeys = computed<string[]>(() => {
  return selectedRows.value.map((r) => r.rowKey)
})
const size = computed(() => props.size)
const sizeStyles = computed(() => {
  const isMiddle = size.value === 'middle'

  return {
    xxl: isMiddle ? 8 : 6,
    xl: isMiddle ? 7 : 5,
    lg: isMiddle ? 5 : 4,
    md: isMiddle ? 4 : 3,
    sm: isMiddle ? 3 : 2,
    xs: isMiddle ? 2 : 1
  }
})

const onCheckedItem = (item: Recordable, checked: boolean) => {
  if (checked) {
    selectedRows.value.push(item)
  } else {
    const rowIndex = selectedRows.value.findIndex((r) => r.rowKey === item.rowKey)
    selectedRows.value.splice(rowIndex, 1)
  }

  emit('select-rows', unref(selectedRows), unref(selectedRowKeys))
}

function initCardChecked() {
  cardRefs.value?.map((cardRef) => {
    cardRef.checked = false
  })
}

defineExpose({
  initCardChecked
})
</script>

<style lang="scss" scoped>
.card-list-container {
  display: grid;
  gap: 1rem;
  :deep(.card-box) {
    width: auto;
  }
}

@include xxs {
  .card-list-container {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  // :deep(.card .img-wrapper) {
  //   height: 6rem !important;
  // }
}
@include xs {
  .card-list-container {
    grid-template-columns: repeat(v-bind('sizeStyles.xs'), minmax(0, 1fr));
  }
  // :deep(.card .img-wrapper) {
  //   height: 6rem !important;
  // }
}
@include sm {
  .card-list-container {
    grid-template-columns: repeat(v-bind('sizeStyles.sm'), minmax(0, 1fr));
  }
  // :deep(.card .img-wrapper) {
  //   height: 6rem !important;
  // }
}
@include md {
  .card-list-container {
    grid-template-columns: repeat(v-bind('sizeStyles.md'), minmax(0, 1fr));
  }
  // :deep(.card .img-wrapper) {
  //   height: 7rem !important;
  // }
}
@include lg {
  .card-list-container {
    grid-template-columns: repeat(v-bind('sizeStyles.lg'), minmax(0, 1fr));
  }
}
@include xl {
  .card-list-container {
    grid-template-columns: repeat(v-bind('sizeStyles.xl'), minmax(0, 1fr));
  }
  // :deep(.card .img-wrapper) {
  //   height: 9rem !important;
  // }
}
@include xxl {
  .card-list-container {
    grid-template-columns: repeat(v-bind('sizeStyles.xxl'), minmax(0, 1fr));
  }
  // :deep(.card .img-wrapper) {
  //   height: 11rem !important;
  // }
}
</style>
