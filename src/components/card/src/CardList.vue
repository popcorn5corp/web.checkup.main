<template>
  <!-- <div class="card-container">
    <template v-if="props.content">
      <div v-for="(card, idx) in props.content" :key="card.id" class="card-box">
        <div class="card">
          <template v-if="props.imgUrl">
            <div class="img-container">
              <Image :src="props.imgUrl">
                <template #previewMask v-if="props.imgPreview">
                  <ZoomInOutlined style="font-size: 40px" />
                </template>
              </Image>
            </div>
          </template>
          <div class="text-box">
            <div class="text-header">
              <template v-if="props.title">
                <p class="title">{{ props.title }}</p>
              </template>
              <template v-if="props.tag">
                <div class="">
                  <p class="tag">{{ props.tag }}</p>
                </div>
              </template>
            </div>
            <template v-if="props.content">
              <div v-for="content in card.contents" :key="content.key" class="content">
                <p>{{ content.label }}</p>
                <span>{{ content.value }}</span>
              </div>
            </template>
            <component v-if="props.component" :is="props.component" />
          </div>
        </div>
        <div
          class="card-masking"
          :style="
            (checkList[idx].isChecked && 'opacity: 1',
            (props.detailBtnText || props.useCheckbox) && ' display: block')
          "
        >
          <template v-if="props.useCheckbox">
            <div class="check-container">
              <Checkbox v-model:checked="checkList[idx].isChecked" />
            </div>
          </template>

          <template v-if="props.detailBtnText">
            <a
              :href="'#'"
              :class="`go-detail ${
                props.detailBtnPosition === DetailPositionType.MIDDLE ? 'middle' : 'bottom'
              }`"
            >
              <template v-if="props.detailBtnPosition === DetailPositionType.MIDDLE">
                <span>{{ props.detailBtnText }}</span>
              </template>
              <template v-if="props.detailBtnPosition === DetailPositionType.BOTTOM">
                <div>{{ props.detailBtnText }}</div>
              </template>
            </a>
          </template>
        </div>
      </div>
    </template>
  </div> -->
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

<script lang="ts" setup>
import { ref } from 'vue'
import type { CardProps } from '../types'

const props = withDefaults(defineProps<CardProps>(), {
  detailBtnPosition: 'middle',
  imgPreview: true
})
console.log(props.content)

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
    min-width: 220px;
    width: auto;
  }
}

@media (min-width: 107rem) and (max-width: 120rem) {
  .card-list-container {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
}
@media (min-width: 86rem) and (max-width: 107rem) {
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
