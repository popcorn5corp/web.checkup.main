<script setup lang="ts" name="Filter">
import { ref, computed } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { filterList } from '../mock'
// import { Button } from '@/components/Button'
import { Button } from '../../Button'
import FilterType from './filterType/FilterType.vue'

const emit = defineEmits(['showFilter'])

const { config } = useProjectConfigStore()
const getTheme = computed(() => config.theme.navTheme)

const getStyle = computed(() => {
  return {
    backgroundColor: config.theme.navTheme === 'light' ? '' : 'rgb(0, 21, 41)'
  }
})

const getClass = computed(() => {
  return [
    {
      [`dark-mode`]: getTheme.value === 'dark'
    }
  ]
})
const filterData = ref({ ...filterList })
const showFilter = ref<Boolean>(true)

const onFilter = (): void => {
  showFilter.value = showFilter ? false : true
  emit('showFilter', showFilter.value)
}
</script>
<template>
  <div class="filter-wrapper">
    <div class="filter-list" v-if="showFilter">
      <!-- 모바일 버전 헤더 -->
      <div class="mobile-header">
        <h3>Filters</h3>
        <font-awesome-icon @click="onFilter" class="xmark" :icon="['fas', 'xmark']" />
      </div>

      <ul>
        <li class="flex-direction-columns" :class="getClass">
          <div v-for="(item, index) in filterData" :key="index">
            <div class="filter-title" @click="() => (item.show = item.show ? false : true)">
              <h3>{{ item.name }}</h3>
              <font-awesome-icon :icon="['fas', 'angle-down']" />
            </div>
            <template v-if="item.show">
              <FilterType :type="item.type" />
            </template>
          </div>
        </li>
      </ul>

      <div class="mobile-footer">
        <a-divider></a-divider>
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
  .mobile-header,
  .mobile-footer {
    display: none;
  }

  .mobile-header {
    text-align: center;
  }

  .mobile-footer {
    position: absolute;
    bottom: 23px;
    width: 100%;
    .btn-group {
      display: flex;
      justify-content: space-around;
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

    background: #ffffff;
    position: absolute;
    top: -7px;
    left: 0px;
    width: 100vw;
    height: 101vh;
  }

  > ul {
    padding: 1rem;

    > li {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
      background: rgb(255, 255, 255);
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
.flex-direction-columns {
  flex-direction: column;
}

.dark-mode {
  background: rgb(0, 21, 41) !important;
  color: white !important;
}
</style>
