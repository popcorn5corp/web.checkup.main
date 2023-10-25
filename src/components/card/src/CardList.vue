<template>
  <div class="card-container">
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
        <!-- hover event -->
        <div
          class="card-masking"
          :style="
            (checkList[idx].isChecked && 'opacity: 1',
            (props.goDetailText || props.useCheckbox) && ' display: block')
          "
        >
          <template v-if="props.useCheckbox">
            <div class="check-container">
              <Checkbox v-model:checked="checkList[idx].isChecked" />
            </div>
          </template>

          <template v-if="props.goDetailText">
            <a
              :href="'#'"
              :class="`go-detail ${
                props.goDetailType === GoDetailType.MIDDLE ? 'middle' : 'bottom'
              }`"
            >
              <template v-if="props.goDetailType === GoDetailType.MIDDLE">
                <span>{{ props.goDetailText }}</span>
              </template>
              <template v-if="props.goDetailType === GoDetailType.BOTTOM">
                <div>{{ props.goDetailText }}</div>
              </template>
            </a>
          </template>
        </div>
        <!-- /// -->
      </div>
    </template>
    <!-- <Tooltip placement="right" overlayClassName="tooltip-container" style="width: 800px">
                <template #title
                  ><img alt="커버이미지" :src="props.imgUrl" style="width: -webkit-fill-available"
                /></template>
              </Tooltip> -->
  </div>
</template>

<script lang="ts" setup>
import { ZoomInOutlined } from '@ant-design/icons-vue'
import { Checkbox, Image } from 'ant-design-vue'
import { ref } from 'vue'
import '../style/card.scss'
import { type CardProps, GoDetailType } from '../types'

// const props = defineProps<CardProps>()
const props = withDefaults(defineProps<CardProps>(), {
  goDetailType: GoDetailType.MIDDLE,
  imgPreview: true
})

const checkList = ref<boolean[]>([])

;(async () => {
  checkList.value = [...Array(props.content.length)].map((_, i) => ({
    index: i,
    isChecked: false
  }))
  console.log(props.content.length, checkList.value)
})()
</script>

<style lang="scss" scoped>
.card-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}
</style>
