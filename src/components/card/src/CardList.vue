<template>
  <template v-if="typeof props.content === 'object'">
    <div class="card-list-container">
      <div v-for="card in props.content" :key="card.key">
        <Card v-bind="{ ...card, ...props }" />
        <!-- :imgUrl="props.imgUrl"
          :key="card.key"
          :title="card.boardTitle"
          :tag="card.division"
          :useCheckbox="props.useCheckbox"
          :content="card.boardContent"
          :detailBtnPosition="props.detailBtnPosition"
          :createdAt="card.createdAt" -->
      </div>
    </div>
  </template>
  <template v-else>
    <Card :v-bind="props" />
    <!-- :imgUrl="props.imgUrl"
      :title="props.title"
      :tag="props.tag"
      :useCheckbox="props.useCheckbox"
      :content="props.content"
      :detailBtnPosition="props.detailBtnPosition" -->
  </template>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { CardProps } from '../types'

const props = withDefaults(defineProps<CardProps>(), {
  detailBtnPosition: 'middle',
  imgPreview: true
})

const size = 'middle' // 'large'
const sizeStyles = computed(() => {
  return {
    xxl: size === 'middle' ? 8 : 6,
    xl: size === 'middle' ? 7 : 5,
    lg: size === 'middle' ? 5 : 4,
    md: size === 'middle' ? 4 : 3,
    sm: size === 'middle' ? 3 : 2,
    xs: size === 'middle' ? 2 : 1
  }
})

// const checkList = ref<boolean[]>([])

// ;(async () => {
//   checkList.value = [...Array(props.content.length)].map((_, i) => ({
//     index: i,
//     isChecked: false
//   }))
//   console.log(props.content)
// })()
</script>

<style lang="scss" scoped>
@import '@/styles/base/_mediaQuery.scss';

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
