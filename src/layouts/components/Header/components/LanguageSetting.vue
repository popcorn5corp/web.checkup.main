<script setup lang="ts">
import { ref, unref, createVNode } from 'vue'
import { Descriptions, Select, Modal } from 'ant-design-vue'
import { localeList } from '@/locales/config'
import { useLocale } from '@/locales/useLocale'
import type { LocaleType } from '@/locales/config'
import { useI18n } from 'vue-i18n'
import { QuestionCircleTwoTone } from '@/components/Icon'
const { Option } = Select
const { t } = useI18n()
const { setLocale, getLocale } = useLocale()
const selectedLocale = ref<LocaleType>(unref(getLocale))
let prevLocale = selectedLocale.value

const onChangeLang = async (locale: LocaleType) => {
  await setLocale(locale)

  Modal.confirm({
    content: t('common.message.changeLang'),
    icon: createVNode(QuestionCircleTwoTone),
    onOk() {
      prevLocale = locale
    },
    async onCancel() {
      selectedLocale.value = prevLocale
      await setLocale(prevLocale)
    }
  })
}
</script>
<template>
  <Descriptions :title="t('layout.header.settings.tabLang')" :column="5">
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
