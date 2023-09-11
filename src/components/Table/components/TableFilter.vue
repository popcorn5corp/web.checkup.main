<script setup lang="ts" name="TableFilter">
import { Divider } from 'ant-design-vue'
import { type Component, computed, ref } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import { Checkbox, Datepicker, Radio, RangeDatePicker, Select } from '@/components/Table/components'
import { Accordion } from '@/components/accordion'
import { Button } from '../../Button'
import type { FilterType } from '../interface'

const emit = defineEmits(['showFilter'])

const { config } = useProjectConfigStore()
const { filterList } = useTableFilterStore()

const getDarkModeClass = computed(() => ({ 'dark-mode': config.theme.navTheme === 'realDark' }))

const showFilter = ref<Boolean>(true)

const onFilter = (): void => {
  showFilter.value = showFilter.value ? false : true
  emit('showFilter', showFilter.value)
}

const filterTypeComponents: Record<FilterType, Component> = {
  checkbox: Checkbox,
  datepicker: Datepicker,
  rangeDatePicker: RangeDatePicker,
  select: Select,
  radio: Radio
}

const customStyle = '  font-weight: bold; font-size: 16px'
</script>
<template>
  <div class="filter-wrapper">
    <div class="filter-list" :class="getDarkModeClass" v-if="showFilter">
      <!-- 모바일 버전 헤더 -->
      <div class="mobile-header">
        <h3>{{ $t('common.filterText') }}</h3>
        <font-awesome-icon @click="onFilter" class="xmark" :icon="['fas', 'xmark']" />
      </div>

      <Accordion :items="filterList" :style="customStyle" ghost>
        <template #content="{ item }">
          <keep-alive>
            <component :is="filterTypeComponents[item.type as FilterType]" :item="item" />
          </keep-alive>
        </template>
      </Accordion>

      <div :class="getDarkModeClass" class="mobile-footer">
        <Divider />
        <div class="btn-group">
          <Button label="Clear all" size="large" @click="onFilter" />
          <Button label="Done" type="primary" size="large" @click="onFilter" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.filter-list {
  width: 100%;
  background: white;
  z-index: 10;

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

    animation: slideUp 0.5s;

    background: $color-white;
    position: absolute;
    top: -7px;
    left: 0px;
    width: 100vw;
    height: 101vh;
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

:deep(.ant-divider) {
  margin: 0 0 10px 0;
}

.dark-mode {
  background: $color-dark !important;
  color: $color-white !important;
}
</style>
