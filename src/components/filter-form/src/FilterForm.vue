<template>
  <div class="filter-form-container" :style="containerStyles">
    <div class="filter-list">
      <!-- <div class="mobile-header">
        <h3>{{ $t('component.button.filter') }}</h3>
        <font-awesome-icon @click="onFilter" class="xmark" :icon="['fas', 'xmark']" />
      </div> -->

      <div class="content">
        <Accordion
          :activeKey="acitveKey"
          :showArrow="true"
          expandIconPosition="end"
          :items="items"
          :style="{ fontWeight: 'bold', fontSize: '16px' }"
          ghost
          @change="onChange"
        >
          <template #expandIcon="{ isActive }">
            <CaretDownOutlined />
          </template>

          <template #content="{ item }">
            <keep-alive>
              <component :is="filterTypeComponents[item.type as FilterUI]" :item="item" />
            </keep-alive>
          </template>
        </Accordion>

        <TableTags :items="getFilterFormItems" />
      </div>

      <!-- <div class="mobile-footer">
        <div class="btn-group">
          <Button :label="$t('component.button.reset')" size="large" @click="onFilter" />
          <Button
            :label="$t('component.button.ok')"
            type="primary"
            size="large"
            @click="onFilter"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts" name="FilterForm">
import { CaretDownOutlined, DownOutlined } from '@ant-design/icons-vue'
import { type Component, computed, ref, unref, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { useTheme } from '@/hooks/useTheme'
import { Accordion } from '@/components/accordion'
import { Button } from '@/components/button'
import { useDynamicTableContext } from '@/components/dynamic-table/hooks/useDynamicTableContext'
import TableTags from '@/components/dynamic-table/src/components/TableTags.vue'
import type { FilterFormProps, FilterUI } from '../types'
import { Checkbox, DatePicker, Radio, RangeDatePicker, Select } from './components/filter-types'

const emit = defineEmits(['close'])
const props = defineProps<FilterFormProps>()

const { getTheme } = useTheme()

const isShow = ref(true)
const acitveKey = ref<string[]>([])
const containerStyles = computed<CSSProperties>(() => {
  const color = unref(getTheme).isDark ? '#434343' : '#fafafa'

  return {
    borderLeft: `thick double ${color}`
  }
})

const dynamicTable = useDynamicTableContext()

const getFilterFormItems = computed(() => dynamicTable.getFilterFormItems())

const onChange = (key: string[]) => {
  if (key.length >= 2) {
    acitveKey.value = [key.shift() as string]
  }
}

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
:deep(.ant-picker-dropdown, .ant-select) {
  z-index: 9999 !important;
}
.filter-form-container {
  border-left: none !important;
  .filter-list {
    z-index: 2;

    :deep(.accordian-container) {
      display: flex;
      gap: 5px;

      .ant-collapse {
        position: relative;
        .ant-collapse-item {
          .ant-collapse-header {
            border: 1px solid #d9d9d9;
            border-radius: 23px;
            padding: 5px 18px;
            display: flex;
            // gap: 6px;
            .ant-collapse-header-text {
              font-weight: 300;
              font-size: 13px;
            }
            align-items: center;

            &:hover {
              background: #f0f4f8;
            }
          }

          align-items: center;
          .ant-collapse-expand-icon {
            font-size: 10px;
          }
        }
        .ant-collapse-content {
          position: absolute;
          z-index: 999;
          top: 34px;
          left: 2px;
          width: 200px;
          background: white;
          border-radius: $radius-round-2;
          box-shadow: $elevation-4;
          .ant-picker {
            width: 100%;
          }

          .ant-checkbox-group {
            padding: 1rem 0 0 0;
          }
        }
      }
    }

    .content {
      display: flex;
      align-items: center;
    }

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

    // @media screen and (max-width: $size-screen-md) {
    //   animation: slideUp 0.5s;
    //   background: $color-white;
    //   // position: absolute;
    //   position: fixed;
    //   top: -7px;
    //   left: 0px;
    //   width: 100vw;
    //   height: 101vh;

    //   :deep(.accordian-container) {
    //     display: flex;
    //     flex-direction: column;
    //     text-align: left;
    //   }
    //   .mobile-header {
    //     padding: 41px 16px;
    //     display: block;
    //     font-size: 20px;
    //     font-weight: 700;

    //     .xmark {
    //       position: absolute;
    //       top: 41px;
    //       right: 30px;
    //       font-size: 22px !important;
    //       color: #04111d;
    //     }
    //   }

    //   .mobile-footer {
    //     display: block;
    //   }

    //   .slideUp {
    //     -webkit-animation-name: slideUp;
    //     animation-name: slideUp;
    //   }

    //   @-webkit-keyframes slideUp {
    //     0% {
    //       -webkit-transform-origin: 0 0;
    //       transform-origin: 0 0;
    //       -webkit-transform: translateY(0%);
    //       transform: translateY(0%);
    //     }

    //     100% {
    //       -webkit-transform-origin: 0 0;
    //       transform-origin: 0 0;
    //       -webkit-transform: translateY(-100%);
    //       transform: translateY(-100%);
    //     }
    //   }

    //   @keyframes slideUp {
    //     0% {
    //       -webkit-transform-origin: 0 0;
    //       transform-origin: 0 0;
    //       -webkit-transform: translateY(100%);
    //       transform: translateY(100%);
    //     }

    //     100% {
    //       -webkit-transform-origin: 0 0;
    //       transform-origin: 0 0;

    //       -webkit-transform: translateY(0%);
    //       transform: translateY(0%);
    //     }
    //   }
    // }

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
