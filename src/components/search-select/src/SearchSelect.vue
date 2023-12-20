<template>
  <div class="search-select-container">
    <Select
      v-model:value="value"
      :options="options"
      :loading="loading"
      :pagination="pagination"
      :placeholder="placeholder"
      :filterOption="filterOption"
      :style="{ width: props.width ?? '50%' }"
      :not-found-content="loading ? undefined : null"
      mode="multiple"
      size="large"
      @search="onSearch"
      @change="onChange"
    >
      <template #option="{ value, label, description, prefixImg, disabled }">
        <div class="select-item">
          <div>
            <img class="select-item-img" v-if="prefixImg" :src="prefixImg" :aria-label="label" />
            <span class="select-item-label">
              <span>{{ label }}</span>
              <span> {{ description }}</span>
            </span>
          </div>

          <slot v-if="disabled" name="statusDisabledText" />
        </div>
      </template>

      <!-- 선택된 아이템 -->
      <template #tagRender="{ value: val, label, closable, onClose, option }">
        <a-tag
          class="select-tag"
          :class="{ 'select-img-padding': !!option?.prefixImg }"
          :closable="closable"
          :color="getLowColorOpacity"
          @close="onClose"
        >
          <img
            class="select-tag-img"
            v-if="option?.prefixImg"
            :src="option?.prefixImg"
            :aria-label="label"
          />
          <span class="select-tag-label" :style="{ color: getPrimaryColor }">{{ label }}</span>
          <template #closeIcon><CloseOutlined :style="{ color: getPrimaryColor }" /></template>
        </a-tag>
      </template>

      <!-- 드롭다운 선택된 아이템 상태 표출 -->
      <template #menuItemSelectedIcon><slot name="statusSelectedText" /></template>

      <template #notFoundContent v-if="loading">
        <a-spin size="small" />
      </template>
    </Select>
  </div>
</template>

<script setup lang="ts" name="SearchSelect">
import { Util } from '@/utils'
import { Select } from 'ant-design-vue'
import type { SelectValue } from 'ant-design-vue/es/tree-select'
import { debounce } from 'lodash-es'
import { computed, ref } from 'vue'
import { useProjectConfigStore } from '@/stores/modules/projectConfig'
import { CloseOutlined } from '@/components/icons'
import type { SearchSelectProps } from '../types'

const emit = defineEmits(['update:modelValue', 'search'])

const props = withDefaults(defineProps<SearchSelectProps>(), {
  filterOption: true
})
const loading = ref(false)
const value = ref()

const {
  config: { theme }
} = useProjectConfigStore()

const getPrimaryColor = computed(() => theme.primaryColor)
const getLowColorOpacity = computed(() => Util.Color.formatRgbaOpacity(getPrimaryColor.value, 0.1))

const onSearch = debounce((value) => {
  loading.value = true

  emit('search', value)

  loading.value = false
}, 300)

const onChange = (value: SelectValue, options: Pick<SearchSelectProps, 'options'>) => {
  emit('update:modelValue', options)

  console.log(value)
}
</script>

<style lang="scss" scoped>
:deep(.ant-tag) {
  display: flex !important;
  align-items: center !important;
  padding: 3px 6px;
  gap: 7px;
}

:deep(.ant-select-selection-overflow) {
  gap: 3px !important;
}

:deep(.ant-select-item) {
  padding-left: 7px !important;
}

.select-item {
  display: flex;
  justify-content: space-between;
  align-items: center !important;
}

.select-item-img,
.select-tag-img {
  width: 31px;
  border-radius: 3px;
}

.select-item-img {
  border-radius: 0.25rem;
  margin-right: 8px;
}

.select-item-label {
  :nth-child(2) {
    margin-left: 3px;
    font-size: 12px;
    font-weight: 300;
  }
}
.select-tag {
  margin-right: 3px;
  display: flex;
  align-items: center;
  padding: 4px 10px;
  gap: 10px;
}

.select-img-padding {
  padding: 0px 10px 0px 0px !important;
}

.select-tag-label {
  font-weight: 600;
  font-size: 15px;
}
</style>
@/utils/colorUtil
