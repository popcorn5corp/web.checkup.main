<template>
  <div class="components-overview-search-select-container">
    <SearchSelect
      v-model:value="selectedValue"
      :options="options"
      :bordered="true"
      placeholder="Select a person"
      width="100%"
      @search="onSearch"
    >
      <template #statusDisabledText> 이미 이 채널에 있음 </template>
      <template #statusSelectedText> 선택됨 </template>
    </SearchSelect>
  </div>
</template>

<script lang="ts" setup name="ComponentsOverviewSearchSelect">
import { ref } from 'vue'
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
        description: `(${user.email})`,
        value: user.name.first,
        prefixImg: user.picture.large,
        disabled: index % 2 === 0 ? false : true
      }))
    })
})()
</script>

<style scoped lang="scss"></style>
