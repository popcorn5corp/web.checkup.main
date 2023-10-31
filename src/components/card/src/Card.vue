<template>
  <div class="card-container">
    <div class="card-box">
      <div class="card">
        <template v-if="imgUrl">
          <div class="img-container">
            <Image :src="imgUrl" :preview="imgPreview">
              <template #previewMask v-if="imgPreview">
                <ZoomInOutlined style="font-size: 40px" />
              </template>
            </Image>
          </div>
        </template>

        <div class="text-box">
          <div class="text-header">
            <template v-if="title">
              <div class="title">{{ title }}</div>
            </template>

            <template v-if="tag">
              <div class="tag">{{ tag }}</div>
            </template>
          </div>

          <template v-if="content">
            <div class="content">
              <p>
                {{ content }}
              </p>
            </div>
          </template>

          <template v-if="createdAt">
            <div class="created">
              <p>
                {{ dayjs.unix(createdAt).format('YYYY-MM-DD') }}
              </p>
            </div>
          </template>

          <component v-if="component" :is="component" />
        </div>
      </div>
      <!-- hover event -->
      <div
        class="card-masking"
        :style="`
          ${(detailBtnPosition || useCheckbox) && 'display: block;'}
          ${checked && ' opacity: 1; display: block'}
        `"
      >
        <template v-if="useCheckbox">
          <div class="check-container">
            <Checkbox v-model:checked="checked" @click="$emit('checked')" />
          </div>
        </template>

        <template v-if="detailBtnPosition">
          <a
            :href="'#'"
            :class="`go-detail ${props.detailBtnPosition === 'middle' ? 'middle' : 'bottom'}`"
            @click="$emit('click', props)"
          >
            <template v-if="detailBtnPosition === 'middle'">
              <span>상세보기</span>
            </template>
            <template v-if="detailBtnPosition === 'bottom'">
              <div>상세보기</div>
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
import type { CardProps } from '../types'

const emit = defineEmits<{
  (event: 'checked'): void
  (event: 'click', item: Recordable): void
}>()

const props = withDefaults(defineProps<CardProps>(), {
  // detailBtnPosition: 'middle',
  imgPreview: true
})
const checked = ref(false)
const {
  imgUrl,
  imgPreview,
  title,
  tag,
  content,
  createdAt,
  component,
  useCheckbox,
  detailBtnPosition
} = props
console.log('>  <', props)
;(async () => {})()
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.card-container {
  .card-box {
    width: fit-content;
    height: fit-content;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 10px;
    border-radius: 10px !important;
    overflow: hidden;
    .card {
      .img-container {
        max-width: 490px;
        max-height: 400px;
        text-align: center;
        overflow: hidden;
        img {
          width: 100%;
          transform: scale(1);
          transition: transform 0.4s;
        }
        :deep(.ant-image) {
          width: 100%;
        }
      }
      .text-box {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        .text-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .title {
          width: 72%;
          font-size: 17px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-right: 10px;
          margin-bottom: 1rem;
        }
        .tag {
          border: 1px solid #979797;
          padding: 4px;
          border-radius: 5px;
          margin-bottom: 1rem;
          font-size: 14px;
        }
        .content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
          font-size: 14px;
        }
        .created {
          text-align: right;
          color: #999;
          p {
            margin: 0;
          }
        }
      }
    }
    .card-masking {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgb(87 86 86 / 40%);
      border-radius: 10px;
      transition: opacity 400ms;
      opacity: 0;
      display: none;
      .check-container {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .middle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        span {
          padding: 12px 15px;
          background: #fff;
          border-radius: 2rem;
          color: #222;
          font-weight: 800;
          font-size: 15px;
        }
      }
      .bottom {
        width: 100%;
        position: absolute;
        bottom: 0;
        border-radius: 0 0 10px 10px;
        text-align: center;
        overflow: hidden;
        transition: transform 0.2s;
        transform: translateY(50px);
        div {
          padding: 10px 0;
          width: 100%;
          background: #1890ff;
          color: #fff;
          font-weight: 600;
          font-size: 15px;
        }
      }
    }
    &:hover {
      .card-masking {
        opacity: 1;
      }
      .img-container img {
        transform: scale(1.2);
      }
      .bottom {
        transform: translateY(0px);
      }
    }
  }
  .card-info {
    font-weight: 500;
  }
}
:deep(.ant-checkbox-inner) {
  width: 24px !important;
  height: 24px !important;
}
:deep(.ant-checkbox-inner):after {
  transform: rotate(45deg) scale(1) translate(-50%, -65%) !important;
}
</style>
