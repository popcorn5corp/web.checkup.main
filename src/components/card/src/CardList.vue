<template>
  <div class="card-list-container">
    <div v-for="card in props.items" :key="card.key">
      <Card
        :title="card.boardTitle"
        :tag="card.division"
        :item="card.boardContent"
        v-bind="{ ...card, ...props }"
        @click="$emit('click', card)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup name="CardList">
import { computed } from 'vue'
import type { CardListProps } from '../types'

const emit = defineEmits(['click'])
const props = withDefaults(defineProps<CardListProps>(), {
  size: 'middle',
  imgPreview: true
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
</script>

<style lang="scss" scoped>
@import '@/styles/main.scss';

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
}
@include xs {
  .card-list-container {
    grid-template-columns: repeat(v-bind('sizeStyles.xs'), minmax(0, 1fr));
  }
}
@include sm {
  .card-list-container {
    grid-template-columns: repeat(v-bind('sizeStyles.sm'), minmax(0, 1fr));
  }
}
@include md {
  .card-list-container {
    grid-template-columns: repeat(v-bind('sizeStyles.md'), minmax(0, 1fr));
  }
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
}
@include xxl {
  .card-list-container {
    grid-template-columns: repeat(v-bind('sizeStyles.xxl'), minmax(0, 1fr));
  }
}
</style>
