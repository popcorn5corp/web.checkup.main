<script setup>
import { ref } from 'vue'
import Button from '@/stories/Button/Button.vue'
import FilterCheckbox from '@/components/Filter/components/FilterCheckbox.vue'
import FilterDatepicker from '@/components/Filter/components/FilterDatepicker.vue'
import FilterSelect from '@/components/Filter/components/FilterSelect.vue'
import FilterRadio from '@/components/Filter/components/FilterRadio.vue'

const showFilter = ref(true)
const showCheckbox = ref(true)
const showDatepicker = ref(true)
const showSelect = ref()
const showRadio = ref(false)
</script>
<template>
  <div class="filter-wrapper">
    <Button
      label="Filter"
      size="large"
      icon="filter"
      @click="showFilter = showFilter ? false : true"
    />

    <div class="filter-list" v-if="showFilter">
      <div class="mobile-header">
        <h3>Filters</h3>
        <font-awesome-icon
          @click="showFilter = showFilter ? false : true"
          class="xmark"
          :icon="['fas', 'xmark']"
        />
      </div>
      <ul>
        <li>
          <div>
            <div class="filter-title" @click="showCheckbox = showCheckbox ? false : true">
              <h3>Checkbox</h3>
              <font-awesome-icon :icon="['fas', 'angle-down']" />
            </div>
            <FilterCheckbox v-if="showCheckbox" />
          </div>
        </li>

        <li>
          <div>
            <div class="filter-title" @click="showRadio = showRadio ? false : true">
              <h3>Radio</h3>
              <font-awesome-icon :icon="['fas', 'angle-down']" />
            </div>
            <FilterRadio v-if="showRadio" />
          </div>
        </li>

        <li>
          <div>
            <div class="filter-title" @click="showDatepicker = showDatepicker ? false : true">
              <h3>Datepicker</h3>
              <font-awesome-icon :icon="['fas', 'angle-down']" />
            </div>
            <FilterDatepicker v-if="showDatepicker" />
          </div>
        </li>
        <li>
          <div>
            <div class="filter-title" @click="showSelect = showSelect ? false : true">
              <h3>Select</h3>
              <font-awesome-icon :icon="['fas', 'angle-down']" />
            </div>
            <FilterSelect v-if="showSelect" />
          </div>
        </li>
      </ul>
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
  width: 300px;
  .mobile-header {
    text-align: center;
    display: none;
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
</style>
