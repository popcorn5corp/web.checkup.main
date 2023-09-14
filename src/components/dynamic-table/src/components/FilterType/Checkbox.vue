<script lang="ts" setup name="FilterCheckbox">
import { ref, toRefs, watch } from 'vue'
import { useTableFilterStore } from '@/stores/modules/tableFilter'
import type { Filter } from '../../../interface'

const props = defineProps({
  item: {
    type: Object as PropType<Filter>,
    default: () => {}
  }
})

const { type, options, selectedItems } = toRefs(props.item)
const { setSelectedFilterData } = useTableFilterStore()
const checkboxOptions = ref([...options.value])
const inputValue = ref<string | undefined>()
const timer = ref()

const onChange = (options: LabelValueType[]) => setSelectedFilterData(type.value, options)

const filterOption = () => {
  checkboxOptions.value = inputValue.value
    ? options.value.filter((option) => option.label.includes(inputValue.value as string))
    : options.value
}

const onKeyup = (e: any) => {
  inputValue.value = e.target.value

  if (timer.value) {
    clearTimeout(timer.value)
  }

  timer.value = setTimeout(() => {
    filterOption()
  }, 500)
}
</script>
<template>
  <div class="filter-input">
    <a-input placeholder="search" v-model:value="inputValue" @keyup="onKeyup">
      <template #suffix>
        <font-awesome-icon style="color: #d9d9d9" :icon="['fas', 'magnifying-glass']" />
      </template>
    </a-input>
  </div>
  <!-- @vue-skip -->
  <a-checkbox-group v-model:value="selectedItems" @change="onChange" name="checkboxgroup">
    <template v-for="(option, index) in checkboxOptions" :key="index">
      <a-col>
        <a-checkbox :value="option">{{ option.label }}</a-checkbox>
      </a-col>
    </template>
  </a-checkbox-group>
</template>
<style lang="scss" scoped>
.filter-input {
  width: 100%;
  :deep(.ant-input) {
    height: 28px;
  }
}

.ant-checkbox-group {
  width: 80%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;

  :deep(.ant-col) {
    margin-top: 1rem;
  }

  :deep(.ant-checkbox-group-item) {
    padding: 1rem;

    &:hover {
      background: rgba(229, 232, 235, 0.2);
      border-radius: 10px;
      cursor: pointer;
    }
  }

  :deep(:where(.css-dev-only-do-not-override-16iczrm).ant-checkbox .ant-checkbox-inner:after) {
    width: 5.714286px !important;
    height: 14.142857px !important;
    top: 40% !important;
  }

  :deep(.ant-checkbox-inner) {
    height: 24px !important;
    width: 24px !important;
  }
}

.ant-divider {
  margin: 6px 0;
}
</style>
