<script setup lang="ts">
import { Descriptions, Modal, Select } from 'ant-design-vue'
import { createVNode, ref, unref } from 'vue'
import { useI18n } from 'vue-i18n'
import { localeList } from '@/locales/config'
import type { LocaleType } from '@/locales/config'
import { useLocale } from '@/locales/useLocale'
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
    width: 450,
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
          >{{ locale.label }}{{ locale.icon }}
        </Option>
      </Select>
    </Descriptions.Item>
  </Descriptions>
</template>
<style lang="scss" scoped></style>
