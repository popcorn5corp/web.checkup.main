<template>
  <div class="components-overview-search-select-container">
    <SearchSelect
      v-model="selectedValue"
      :options="options"
      placeholder="Select a person"
      :bordered="true"
      @search="onSearch"
    >
      <template #statusDisabledText>비활성화</template>
      <template #statusSelectedText> <CheckOutlined /> </template>
    </SearchSelect>
  </div>
</template>

<script lang="ts" setup name="ComponentsOverviewSearchSelect">
import { ref } from 'vue'
import { CheckOutlined } from '@/components/icons'
import { SearchSelect } from '@/components/search-select'

const options = ref([])
const selectedValue = ref()

const MOCK_API_URL = 'https://randomuser.me/api/?results=5'

// TODO: pagination이 필요한 API 대응 (ex: 무한 스크롤)
const onSearch = (value: string) => {
  console.log(selectedValue.value, value)
}

;(async () => {
  await fetch(MOCK_API_URL)
    .then((response) => response.json())
    .then((data) => {
      options.value = data.results.map((user: any, index: any) => ({
        label: `${user.name.first} ${user.name.last}`,
        value: user.name.first,
        disabled: index % 2 === 0 ? false : true
      }))
    })
})()
</script>

<style scoped lang="scss"></style>
