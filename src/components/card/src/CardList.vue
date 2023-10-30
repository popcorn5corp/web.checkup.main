<template>
  <template v-if="typeof props.content === 'object'">
    <div class="card-list-container">
      <div v-for="card in props.content" :key="card.key">
        <Card
          :imgUrl="props.imgUrl"
          :key="card.key"
          :detailBtnText="props.detailBtnText"
          :title="card.boardTitle"
          :tag="card.division"
          :useCheckbox="props.useCheckbox"
          :content="card.boardContent"
          :detailBtnPosition="props.detailBtnPosition"
          :createdAt="card.createdAt"
        />
      </div>
    </div>
  </template>
  <template v-else>
    <!-- :imgUrl="checkupLogo" -->
    <Card
      :key="1234"
      :detailBtnText="props.detailBtnText"
      :title="props.title"
      :tag="props.tag"
      :useCheckbox="props.useCheckbox"
      :content="props.content"
      :detailBtnPosition="props.detailBtnPosition"
    />
  </template>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { CardProps } from '../types'

const props = withDefaults(defineProps<CardProps>(), {
  detailBtnPosition: 'middle',
  imgPreview: true
})
console.log('card-list', props)

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
.card-list-container {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 1rem;
  :deep(.card-box) {
    min-width: 170px !important;
    width: auto;
  }
}

@media (min-width: 110rem) and (max-width: 120rem) {
  .card-list-container {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
}
@media (min-width: 95rem) and (max-width: 110rem) {
  .card-list-container {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}
@media (min-width: 86rem) and (max-width: 95rem) {
  .card-list-container {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
@media (min-width: 64rem) and (max-width: 86rem) {
  .card-list-container {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
@media (min-width: 48rem) and (max-width: 64rem) {
  .card-list-container {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (min-width: 32rem) and (max-width: 48rem) {
  .card-list-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 32rem) {
  .card-list-container {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
