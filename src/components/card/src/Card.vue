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
              <div class="title">{{ props.title }}</div>
            </template>

            <template v-if="props.tag">
              <div class="tag">{{ props.tag }}</div>
            </template>
          </div>

          <template v-if="props.content">
            <div class="content">
              <p>
                {{ props.content }}
              </p>
            </div>
          </template>

          <template v-if="props.createdAt">
            <div class="created">
              <p>
                {{ dayjs.unix(props.createdAt).format('YYYY-MM-DD') }}
              </p>
            </div>
          </template>

          <component v-if="props.component" :is="props.component" />
        </div>
      </div>
      <!-- hover event -->
      <div
        class="card-masking"
        :style="`
          ${(props.detailBtnText?.length || props.useCheckbox) && 'display: block;'}
          ${checked && ' opacity: 1; display: block'}
        `"
      >
        <template v-if="props.useCheckbox">
          <div class="check-container">
            <Checkbox v-model:checked="checked" @click="$emit('checked')" />
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
  </div>
</template>

<script lang="ts" setup>
import { ZoomInOutlined } from '@ant-design/icons-vue'
import { Checkbox, Image } from 'ant-design-vue'
import dayjs from 'dayjs'
import { ref } from 'vue'
import '../style/card.scss'
import { type CardProps, DetailPositionType } from '../types'

defineEmits<{
  (event: 'checked'): void
}>()

// const props = defineProps<CardProps>()
const props = withDefaults(defineProps<CardProps>(), {
  detailBtnPosition: DetailPositionType.MIDDLE,
  imgPreview: true
})
const checked = ref(false)
;(async () => {})()
</script>

//
<style lang="scss" scoped></style>
