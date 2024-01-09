<template>
  <div class="filter-form-container" :style="containerStyles">
    <div class="filter-list">
      <!--  -->
      <div class="mobile-header">
        <h3>{{ $t('common.filter') }}</h3>
        <font-awesome-icon @click="onFilter" class="xmark" :icon="['fas', 'xmark']" />
      </div>

      <Accordion :items="items" :style="{ fontWeight: 'bold', fontSize: '16px' }" ghost>
        <template #content="{ item }">
          <keep-alive>
            <component :is="filterTypeComponents[item.type as FilterUI]" :item="item" />
          </keep-alive>
        </template>
      </Accordion>

      <div class="mobile-footer">
        <div class="btn-group">
          <Button label="Clear all" size="large" @click="onFilter" />
          <Button label="Done" type="primary" size="large" @click="onFilter" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="FilterForm">
import { type Component, computed, ref } from 'vue'
import type { CSSProperties } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { Accordion } from '@/components/accordion'
import { Button } from '@/components/button'
import type { FilterFormProps, FilterUI } from '../types'
import { Checkbox, DatePicker, Radio, RangeDatePicker, Select } from './components/filter-types'

const emit = defineEmits(['close'])
defineProps<FilterFormProps>()
const {
  config: { theme }
} = useProjectConfigStore()
const isShow = ref(true)
const containerStyles = computed<CSSProperties>(() => {
  const color = theme.isRealDarkTheme ? '#434343' : '#fafafa'

  return {
    borderLeft: `thick double ${color}`
  }
})

const onFilter = (): void => {
  isShow.value = !isShow.value
  emit('close', isShow.value)
}

const filterTypeComponents: Record<FilterUI, Component> = {
  Checkbox,
  DatePicker,
  RangeDatePicker,
  Select,
  Radio
}
</script>

<style lang="scss" scoped>
.filter-form-container {
  .filter-list {
    // width: 100%;
    background: $color-white;
    z-index: 999;

    .mobile-header {
      display: none;
      text-align: center;
    }

    .mobile-footer {
      display: none;
      position: fixed;
      bottom: 0px;
      width: 100%;

      .btn-group {
        display: flex;
        justify-content: space-around;
        margin-bottom: 10px;

        button {
          width: 47%;
          height: 54px;
        }
      }
    }

    @media screen and (max-width: 830px) {
      animation: slideUp 0.5s;
      background: $color-white;
      // position: absolute;
      position: fixed;
      top: -7px;
      left: 0px;
      width: 100vw;
      height: 101vh;

      .mobile-header {
        padding: 41px 16px;
        display: block;
        font-size: 20px;
        font-weight: 700;

        .xmark {
          position: absolute;
          top: 41px;
          right: 30px;
          font-size: 22px !important;
          color: #04111d;
        }
      }

      .mobile-footer {
        display: block;
      }

      .slideUp {
        -webkit-animation-name: slideUp;
        animation-name: slideUp;
      }

      @-webkit-keyframes slideUp {
        0% {
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: translateY(0%);
          transform: translateY(0%);
        }

        100% {
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: translateY(-100%);
          transform: translateY(-100%);
        }
      }

      @keyframes slideUp {
        0% {
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: translateY(100%);
          transform: translateY(100%);
        }

        100% {
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;

          -webkit-transform: translateY(0%);
          transform: translateY(0%);
        }
      }
    }

    > ul {
      padding: 0 1rem;

      > li {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 600;
        background: $color-white;
        flex-direction: column;

        > div {
          display: flex;
          flex-direction: column;
          width: 100%;

          > div.filter-title {
            display: flex;
            justify-content: space-between;
            padding: 1rem;

            &:hover {
              background: rgba(229, 232, 235, 0.2);
              border-radius: 10px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
