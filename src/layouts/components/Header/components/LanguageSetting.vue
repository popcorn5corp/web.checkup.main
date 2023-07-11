<script setup lang="ts">
import { ref, unref } from 'vue'
import { Descriptions, Select } from 'ant-design-vue'
import { localeList } from '@/locales/config'
import { useLocale } from '@/locales/useLocale'
import type { LocaleType } from '@/locales/config'
const { Option } = Select

const { setLocale, getLocale } = useLocale()
const selectedLocale = ref<LocaleType>(unref(getLocale))

const onChangeLang = (locale: LocaleType) => {
  setLocale(locale)
}
</script>
<template>
  <Descriptions :title="$t('layout.header.settings.tabTitle.language')" :column="5">
    <Descriptions.Item>
      <Select
        v-model:value="selectedLocale"
        ref="select"
        style="width: 200px"
        @change="onChangeLang(selectedLocale)"
      >
        <Option v-for="locale in localeList" :key="locale.lang" :value="locale.lang"
          >{{ locale.label }}{{ locale.icon }}</Option
        >
      </Select>
    </Descriptions.Item>
  </Descriptions>
</template>
<style lang="scss" scoped></style>
