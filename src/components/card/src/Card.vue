<template>
  <div class="card-container">
    <div class="card-box">
      <div class="card">
        <template v-if="props.imgUrl">
          <div class="img-container">
            <Image :src="props.imgUrl" :preview="props.imgPreview">
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
            <div class="content">
              <p>
                {{ props.content }}
              </p>
            </div>
          </template>

          <component v-if="props.component" :is="props.component" />
        </div>
      </div>
      <!-- hover event -->
      <div
        class="card-masking"
        :style="
          (checked && 'opacity: 1', (props.goDetailText || props.useCheckbox) && ' display: block')
        "
      >
        <template v-if="props.useCheckbox">
          <div class="check-container">
            <Checkbox v-model:checked="checked" />
          </div>
        </template>

        <template v-if="props.goDetailText">
          <a
            :href="'#'"
            :class="`go-detail ${props.goDetailType === GoDetailType.MIDDLE ? 'middle' : 'bottom'}`"
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
    </div>
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
const checked = ref(false)
;(async () => {
  if (props.goDetailType === GoDetailType.MIDDLE) {
  }
})()
</script>

//
<style lang="scss" scoped></style>
